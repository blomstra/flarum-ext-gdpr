import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UserControls from 'flarum/forum/utils/UserControls';
import ItemList from 'flarum/common/utils/ItemList';
import User from 'flarum/common/models/User';
import Button from 'flarum/common/components/Button';
import RequestDataExportModal from '../../common/components/RequestDataExportModal';
import type Mithril from 'mithril';
import DeleteUserModal from '../components/DeleteUserModal';

export default function extendUserControls() {
  extend(UserControls, 'moderationControls', function (items: ItemList<Mithril.Children>, user: User) {
    if (app.session.user?.canModerateExports()) {
      items.add(
        'gdpr-export',
        <Button icon="fas fa-file-export" onclick={() => app.modal.show(RequestDataExportModal, { user })}>
          {app.translator.trans('blomstra-gdpr.forum.settings.export_data_button')}
        </Button>
      );
    }
  });

  extend(UserControls, 'destructiveControls', function (items: ItemList<Mithril.Children>, user: User) {
    items.remove('delete');

    if (user.canDelete()) {
      items.add(
        'gdpr-erase',
        <Button icon="fas fa-eraser" onclick={() => app.modal.show(DeleteUserModal, { user })}>
          {app.translator.trans('blomstra-gdpr.forum.delete_user.delete_button')}
        </Button>
      );
    }
  });
}
