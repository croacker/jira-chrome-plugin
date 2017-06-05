var TARGET_INPUT = 'search-text';

var workTimeComponent;

(function () {

    var showWorkTimeComponent = function (target) {
        if (!workTimeComponent) {
            workTimeComponent = createWorkTimeComponent(target);
        }
        workTimeComponent.show();
    }

    var createWorkTimeComponent = function (target) {
        return new WorkTimeComponent(target);
    }

    var onFocusWorkTime = function (focusEvent) {
        showWorkTimeComponent(focusEvent.target);
    };

    var init = function () {
        var target = document.getElementById(TARGET_INPUT);
        target.onfocus = onFocusWorkTime;
        target.onclick = onFocusWorkTime;
        return target;
    }

    init();
})();


/**
 * Класс - div - блок с селектом по заданным параметрам.
 * @param title    - заголовок
 * @param id       - уникальный id
 * @param range    - ограничение значений сверху
 * @param multiply - множитель значений
 * @return div - блок со всем добром
 */
function SelectComponent(title, id, range, multiply, suffix) {
    var selection;
    /**
     * Получить html компонента
     */
    this.getHtml = function () {
        var select = '<div class="crc-work-select-container">'
            + ' <label>' + title + '</label>'
            + ' <br>'
            + ' <select id="' + id + '" class="crc-work-select">';
        for (var i = 0; i <= range; i++) {
            select = select + '<option>' + i * multiply + '</option>';
        }
        return select + '</select></div>';
    }
    /**
     * Получить значение компонента.
     */
    this.getValue = function () {
        if (!selection) {
            selection = document.getElementById(id);
        }
        return selection.options[selection.selectedIndex].value + suffix;
    }
}

/**
 * Компонент выбора значени даты/времени
 */
function WorkTimeComponent(target) {
    var me = this;

    this.wrapperDiv;

    var selectWeek = new SelectComponent('Недели', 'crcWeek', 4, 1, 'w ');
    var selectDay = new SelectComponent('Дни', 'crcDay', 6, 1, 'd ');
    var selectHour = new SelectComponent('Часы', 'crcHour', 23, 1, 'h ');
    var selectMinute = new SelectComponent('Минуты', 'crcMinute', 5, 10, 'm ');

    /**
     * Получить html компонента
     */
    this.getHtml = function () {
        //Компонуем итоговый блок с селектами
        const wrapper = '<div id="crcWorkTime">'
            + selectWeek.getHtml()
            + selectDay.getHtml()
            + selectHour.getHtml()
            + selectMinute.getHtml()
            + '</div>';
        return wrapper;
    }
    /**
     * Получить значение компонента.
     */
    this.getValue = function () {
        return selectWeek.getValue()
            + selectDay.getValue()
            + selectHour.getValue()
            + selectMinute.getValue();
    }

    /**
     * Применить значение на целевой компонент.
     */
    this.applyValue = function () {
        target.value = me.getValue();
    }

    /**
     * Отобразить элемент
     */
    this.show = function () {
        me.wrapperDiv.style.display = 'block';
    }

    /**
     * Скрыть элемент
     */
    this.hide = function () {
        me.wrapperDiv.style.display = 'none';
    }

    this.init = function () {
        var parentDiv = target.parentNode;
        me.wrapperDiv = document.createElement('div');
        me.wrapperDiv.innerHTML = me.getHtml();

        parentDiv.insertBefore(me.wrapperDiv, target);

        document.querySelectorAll('.crc-work-select').forEach(function (item, i, arr) {
            item.onchange = me.applyValue;
        });
    };

    this.init();
}