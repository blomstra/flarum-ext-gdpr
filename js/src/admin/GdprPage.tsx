import app from 'flarum/admin/app';
import AdminPage, { AdminHeaderAttrs } from 'flarum/admin/components/AdminPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import type { IPageAttrs } from 'flarum/common/components/Page';
import type Mithril from 'mithril';
import DataType from './models/DataType';
import Tooltip from 'flarum/common/components/Tooltip';
import ExtensionLink from './components/ExtensionLink';
import LinkButton from 'flarum/common/components/LinkButton';

export default class GdprPage<CustomAttrs extends IPageAttrs = IPageAttrs> extends AdminPage<CustomAttrs> {
  gdprDataTypes: DataType[] = [];

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    this.loadGdprDataTypes();
  }

  headerInfo(): AdminHeaderAttrs {
    return {
      className: 'GdprPage--header',
      icon: 'fas fa-user-shield',
      title: app.translator.trans('flarum-gdpr.admin.gdpr_page.heading'),
      description: app.translator.trans('flarum-gdpr.admin.gdpr_page.description'),
    };
  }

  loadGdprDataTypes() {
    this.loading = true;
    app.store.find<DataType[]>('gdpr-datatypes').then((dataTypes) => {
      this.gdprDataTypes = dataTypes;
      this.loading = false;
      m.redraw();
    });
  }

  content(): Mithril.Children {
    if (this.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="GdprPage">
        <h3>{app.translator.trans('flarum-gdpr.admin.gdpr_page.settings.heading')}</h3>
        <p className="helpText">{app.translator.trans('flarum-gdpr.admin.gdpr_page.settings.help_text')}</p>
        <LinkButton className="Button" href={app.route('extension', { id: 'flarum-gdpr' })}>
          {app.translator.trans('flarum-gdpr.admin.gdpr_page.settings.extension_settings_button')}
        </LinkButton>
        <hr />
        <h3>{app.translator.trans('flarum-gdpr.admin.gdpr_page.data_types.title')}</h3>
        <p className="helpText">{app.translator.trans('flarum-gdpr.admin.gdpr_page.data_types.help_text')}</p>

        <div className="GdprGrid">
          <div class="GdprGrid-row">
            <div className="GdprGrid-header">{app.translator.trans('flarum-gdpr.admin.gdpr_page.data_types.type')}</div>
            <div className="GdprGrid-header">{app.translator.trans('flarum-gdpr.admin.gdpr_page.data_types.export_description')}</div>
            <div className="GdprGrid-header">{app.translator.trans('flarum-gdpr.admin.gdpr_page.data_types.anonymize_description')}</div>
            <div className="GdprGrid-header">{app.translator.trans('flarum-gdpr.admin.gdpr_page.data_types.delete_description')}</div>
            <div className="GdprGrid-header">{app.translator.trans('flarum-gdpr.admin.gdpr_page.data_types.extension')}</div>
          </div>

          {this.gdprDataTypes.map((dataType) => (
            <>
              <div class="GdprGrid-row">
                <div>
                  <Tooltip text={dataType.id()}>
                    <span className="helpText">{dataType.type()}</span>
                  </Tooltip>
                </div>
                <div className="helpText">{dataType.exportDescription()}</div>
                <div className="helpText">{dataType.anonymizeDescription()}</div>
                <div className="helpText">{dataType.deleteDescription()}</div>
                <div>
                  <ExtensionLink extension={app.data.extensions[dataType.extension()]} />
                </div>
              </div>
            </>
          ))}
        </div>
        <hr />
        <h3>{app.translator.trans('flarum-gdpr.admin.gdpr_page.user_table_data.title')}</h3>
        <p className="helpText">{app.translator.trans('flarum-gdpr.admin.gdpr_page.user_table_data.help_text')}</p>
        <div className="GdprUserColumnData">Not yet implemented</div>
      </div>
    );
  }
}
