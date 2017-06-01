var TARGET_INPUT = 'search-text';

var workTimeComponent;

(function () {
    var quickSearchQuery = document.getElementById(TARGET_INPUT);
    quickSearchQuery.onfocus = onFocusWorkTime;
    quickSearchQuery.los = onBlurWorkTime;

    var wrapper = getWorkTimeComponent();

    var parentDiv = quickSearchQuery.parentNode;
    var wrapperElement = document.createElement('div');
    wrapperElement.innerHTML = wrapper.getHtml();

    parentDiv.insertBefore(wrapperElement, quickSearchQuery);

    document.querySelectorAll('.crc-work-select').forEach(function (item, i, arr) {
        item.onchange = onChangeSelectorHandler;
    });

})();

function onFocusWorkTime(){
    
}

function onBlurWorkTime(){
    
}

function getWorkTimeComponent(){
    if(!workTimeComponent){
        workTimeComponent = createWorkTimeComponent();
    } 
    return workTimeComponent;
}

function createWorkTimeComponent(){
    //Строим необходимые селекты
    var selectWeek = new SelectComponent('Недели', 'crcWeek', 4, 1);
    var selectDay =  new SelectComponent('Дни', 'crcDay', 6, 1);
    var selectHour =  new SelectComponent('Часы', 'crcHour', 23, 1);
    var selectMinute =  new SelectComponent('Минуты', 'crcMinute', 5, 10);
    const wrapper = new WorkTimeComponent(selectWeek, selectDay, selectHour, selectMinute);
    
    return wrapper;
}

function onChangeSelectorHandler(event) {
    var crcWeek = document.getElementById('crcWeek');
    var week = addSelectValueSuffix(crcWeek.options[crcWeek.selectedIndex].value, 'w ');

    var crcDay = document.getElementById('crcDay');
    var day = addSelectValueSuffix(crcDay.options[crcDay.selectedIndex].value, 'd ');

    var crcHour = document.getElementById('crcHour');
    var hour = addSelectValueSuffix(crcHour.options[crcHour.selectedIndex].value, 'h ');

    var crcMinute = document.getElementById('crcMinute');
    var minute = addSelectValueSuffix(crcMinute.options[crcMinute.selectedIndex].value, 'm ');

    var quickSearchQuery = document.getElementById(TARGET_INPUT);
    quickSearchQuery.value = week + day + hour + minute;
}

/**
 * Метод строит и возвращает div - блок с селектом по заданным параметрам.
 * @param title    - заголовок
 * @param id       - уникальный id
 * @param range    - ограничение значений сверху
 * @param multiply - множитель значений
 * @return div - блок со всем добром
 */
function buildSelect(title, id, range, multiply) {
    return new SelectComponent(title, id, range, multiply);
}

/**
 * Добавить суффикс к выбранному значению
 * @param {*} selectValue 
 * @param {*} suffix 
 */
function addSelectValueSuffix(selectValue, suffix) {
    if (selectValue) {
        selectValue += suffix;
    }
    return selectValue;
}

/**
 * Класс - div - блок с селектом по заданным параметрам.
 * @param title    - заголовок
 * @param id       - уникальный id
 * @param range    - ограничение значений сверху
 * @param multiply - множитель значений
 * @return div - блок со всем добром
 */
function SelectComponent(title, id, range, multiply) {
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
}

function WorkTimeComponent(selectWeek, selectDay, selectHour, selectMinute) {
    var me = this;
    this.weekComponent = selectWeek;
    this.dayComponent = selectDay;
    this.hourComponent = selectHour;
    this.minuteComponent = selectMinute;

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

    this.getElement = function(){
        var element = document.createElement('div');
        element.innerHTML = me.getHtml();
        return element;
    }
}