import coreModule from 'app/core/core_module';

const template = `
<div class="modal-body">
	<div class="modal-header">
		<h2 class="modal-header-title">
			<i class="fa fa-copy"></i>
			<span class="p-l-1">Сохранить в...</span>
		</h2>

		<a class="modal-header-close" ng-click="ctrl.dismiss();">
			<i class="fa fa-remove"></i>
		</a>
	</div>

	<form name="ctrl.saveForm" class="modal-content" novalidate>
		<div class="p-t-2">
			<div class="gf-form">
				<label class="gf-form-label width-8">Новое имя</label>
				<input type="text" class="gf-form-input" ng-model="ctrl.clone.title" give-focus="true" required>
			</div>
      <folder-picker initial-folder-id="ctrl.folderId"
                       on-change="ctrl.onFolderChange($folder)"
                       enter-folder-creation="ctrl.onEnterFolderCreation()"
                       exit-folder-creation="ctrl.onExitFolderCreation()"
                       enable-create-new="true"
                       label-class="width-8"
                       dashboard-id="ctrl.clone.id">
      </folder-picker>
      <div class="gf-form-inline">
        <gf-form-switch class="gf-form" label="Копировать теги" label-class="width-8" checked="ctrl.copyTags">
        </gf-form-switch>
      </div>
		</div>

		<div class="gf-form-button-row text-center">
			<button type="submit" class="btn btn-primary" ng-click="ctrl.save()" ng-disabled="!ctrl.isValidFolderSelection">Сохранить</button>
			<a class="btn-text" ng-click="ctrl.dismiss();">Выход</a>
		</div>
	</form>
</div>
`;

export class SaveDashboardAsModalCtrl {
  clone: any;
  folderId: any;
  dismiss: () => void;
  isValidFolderSelection = true;
  copyTags: boolean;

  /** @ngInject */
  constructor(private dashboardSrv) {
    const dashboard = this.dashboardSrv.getCurrent();
    this.clone = dashboard.getSaveModelClone();
    this.clone.id = null;
    this.clone.uid = '';
    this.clone.title += ' Copy';
    this.clone.editable = true;
    this.clone.hideControls = false;
    this.folderId = dashboard.meta.folderId;
    this.copyTags = false;

    // remove alerts if source dashboard is already persisted
    // do not want to create alert dupes
    if (dashboard.id > 0) {
      this.clone.panels.forEach(panel => {
        if (panel.type === 'graph' && panel.alert) {
          delete panel.thresholds;
        }
        delete panel.alert;
      });
    }

    delete this.clone.autoUpdate;
  }

  save() {
    if (!this.copyTags) {
      this.clone.tags = [];
    }

    return this.dashboardSrv.save(this.clone, { folderId: this.folderId }).then(this.dismiss);
  }

  keyDown(evt) {
    if (evt.keyCode === 13) {
      this.save();
    }
  }

  onFolderChange(folder) {
    this.folderId = folder.id;
  }

  onEnterFolderCreation() {
    this.isValidFolderSelection = false;
  }

  onExitFolderCreation() {
    this.isValidFolderSelection = true;
  }
}

export function saveDashboardAsDirective() {
  return {
    restrict: 'E',
    template: template,
    controller: SaveDashboardAsModalCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    scope: { dismiss: '&' },
  };
}

coreModule.directive('saveDashboardAsModal', saveDashboardAsDirective);
