import coreModule from '../../core_module';
import appEvents from 'app/core/app_events';

export class HelpCtrl {
  tabIndex: any;
  shortcuts: any;

  /** @ngInject */
  constructor() {
    this.tabIndex = 0;
    this.shortcuts = {
      Главные: [
        { keys: ['g', 'h'], description: 'Вернуть на главную панель' },
        { keys: ['g', 'p'], description: 'Перейти в профиль' },
        { keys: ['s', 'o'], description: 'Открыть поиск' },
        { keys: ['esc'], description: 'Выход из режима редактирования / настройки представлений' },
      ],
      Панель: [
        { keys: ['mod+s'], description: 'Сохранить панель' },
        { keys: ['d', 'r'], description: 'Обновить все понели' },
        { keys: ['d', 's'], description: 'Настройки панели' },
        { keys: ['d', 'v'], description: 'Переключение в активный режим / вид ' },
        { keys: ['d', 'k'], description: 'Переключить режим киоска (скрывает верхнюю навигацию)' },
        { keys: ['d', 'E'], description: 'Разверните все строки' },
        { keys: ['d', 'C'], description: 'Свернуть все строки' },
        { keys: ['d', 'a'], description: 'Переключение панелей автоматической подгонки (экспериментальная функция)' },
        { keys: ['mod+o'], description: 'Переключение перекрестия общего графика' },
        { keys: ['d', 'l'], description: 'Переключение всех легенд панели' },
      ],
      'Специальная панель': [
        { keys: ['e'], description: 'Переключить панель редактирования вида' },
        { keys: ['v'], description: 'Переключить панель полноэкранного просмотра' },
        { keys: ['p', 's'], description: 'Доля Группы Модальных' },
        { keys: ['p', 'd'], description: 'Дубликат Панели' },
        { keys: ['p', 'r'], description: 'Снять Панель' },
        { keys: ['p', 'l'], description: 'Легенда панели переключения' },
      ],
      'Временные интервалы': [
        { keys: ['t', 'z'], description: 'Масштабирование временного диапазона' },
        {
          keys: ['t', '<i class="fa fa-long-arrow-left"></i>'],
          description: 'Перемещение временного диапазона назад',
        },
        {
          keys: ['t', '<i class="fa fa-long-arrow-right"></i>'],
          description: 'Перемещение временного диапазона вперед',
        },
      ],
    };
  }

  dismiss() {
    appEvents.emit('hide-modal');
  }
}

export function helpModal() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/core/components/help/help.html',
    controller: HelpCtrl,
    bindToController: true,
    transclude: true,
    controllerAs: 'ctrl',
    scope: {},
  };
}

coreModule.directive('helpModal', helpModal);
