import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import extractText from 'flarum/utils/extractText';
import ItemList from 'flarum/utils/ItemList';
import Stream from 'flarum/utils/Stream';

export default class RequestErasureModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.reason = Stream('');
    this.password = Stream('');
  }

  className() {
    return 'RequestErasureModal Modal--small';
  }

  title() {
    return app.translator.trans('blomstra-gdpr.forum.request_erasure.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">{this.fields().toArray()}</div>
      </div>
    );
  }

  fields() {
    const items = new ItemList();

    const currRequest = app.session.user.erasureRequest();

    if (currRequest) {
      items.add(
        'status',
        <div className="Form-group">
          <p className="helpText">{app.translator.trans(`blomstra-gdpr.forum.request_erasure.status.${currRequest.status()}`)}</p>
        </div>
      );

      if (currRequest.reason()) {
        items.add(
          'reason',
          <div className="Form-group">
            <p className="helpText">{app.translator.trans('blomstra-gdpr.forum.request_erasure.reason', { reason: currRequest.reason() })}</p>
          </div>
        );
      }

      items.add(
        'cancel',
        <div className="Form-group">
          {Button.component(
            {
              className: 'Button Button--primary Button--block',
              onclick: this.oncancel.bind(this),
              loading: this.loading,
            },
            app.translator.trans('blomstra-gdpr.forum.request_erasure.cancel_button')
          )}
        </div>
      );
    } else {
      items.add('text', <p className="helpText">{app.translator.trans('blomstra-gdpr.forum.request_erasure.text')}</p>);

      items.add(
        'password',
        <div className="Form-group">
          <input
            type="password"
            className="FormControl"
            bidi={this.password}
            placeholder={extractText(app.translator.trans('blomstra-gdpr.forum.request_erasure.password_label'))}
          />
        </div>
      );

      items.add(
        'reason',
        <div className="Form-group">
          <textarea
            className="FormControl"
            value={this.reason()}
            oninput={(e) => this.reason(e.target.value)}
            placeholder={extractText(app.translator.trans('blomstra-gdpr.forum.request_erasure.reason_label'))}
          ></textarea>
        </div>
      );

      items.add(
        'submit',
        <div className="Form-group">
          {Button.component(
            {
              className: 'Button Button--primary Button--block',
              type: 'submit',
              loading: this.loading,
            },
            app.translator.trans('blomstra-gdpr.forum.request_erasure.request_button')
          )}
        </div>
      );
    }

    return items;
  }

  oncancel(e) {
    this.loading = true;
    m.redraw();

    app.session.user
      .erasureRequest()
      .delete()
      .then(() => {
        this.loading = false;
        m.redraw();
      });
  }

  data() {
    // Status is set so that the proper confirmation message is displayed.
    return {
      reason: this.reason(),
      status: 'user_confirmed',
      relationships: { user: app.session.user },
    };
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    app.store
      .createRecord('user-erasure-requests')
      .save(this.data(), { meta: { password: this.password() } })
      .then((erasureRequest) => {
        app.session.user.pushData({ relationships: { erasureRequest } });
        this.loading = false;
        m.redraw();
      })
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
