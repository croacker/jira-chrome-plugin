var TARGET_INPUT = 'quick-search-query';

var workTimeComponent;

(function () {
    var quickSearchQuery = document.getElementById(TARGET_INPUT);
    // quickSearchQuery.onfocus = function(){
        
    // }

    // quickSearchQuery.los = function(){
        
    // }

    // //Строим необходимые селекты
    // var selectWeek = buildSelect('Недели', 'crcWeek', 9, 1);
    // var selectDay = buildSelect('Дни', 'crcDay', 4, 1);
    // var selectHour = buildSelect('Часы', 'crcHour', 9, 1);
    // var selectMinute = buildSelect('Минуты', 'crcMinute', 5, 10);

    // //Компонуем итоговый блок с селектами
    // const wrapper = '<div id="crcWorkTime" style="background-color:white; position:absolute;  margin:-7px 0 0 169px; padding: 0 3px 3px 3px; z-index:9999; border-radius:3px; box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.48);">' + selectWeek + selectDay + selectHour + selectMinute + '</div>';
    var wrapper = getWorkTimeComponent();

    var parentDiv = quickSearchQuery.parentNode;
    var wrapperElement = document.createElement('div');
    wrapperElement.innerHTML = wrapper;

    parentDiv.insertBefore(wrapperElement, quickSearchQuery);

    document.querySelectorAll('.crc-work-select').forEach(function (item, i, arr) {
        item.onchange = onChangeSelectorHandler;
    });

})();

function getWorkTimeComponent(){
    if(!workTimeComponent){
        workTimeComponent = createWorkTimeComponent();
    } 
    return workTimeComponent;
}

function createWorkTimeComponent(){
    //Строим необходимые селекты
    var selectWeek = buildSelect('Недели', 'crcWeek', 9, 1);
    var selectDay = buildSelect('Дни', 'crcDay', 4, 1);
    var selectHour = buildSelect('Часы', 'crcHour', 9, 1);
    var selectMinute = buildSelect('Минуты', 'crcMinute', 5, 10);

    //Компонуем итоговый блок с селектами
    const wrapper = '<div id="crcWorkTime" style="background-color:white; position:absolute;  margin:-7px 0 0 169px; padding: 0 3px 3px 3px; z-index:9999; border-radius:3px; box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.48);">' + selectWeek + selectDay + selectHour + selectMinute + '</div>';
    
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
    var select = '<div style="height:100%; margin: 0 5px; float:left; display:inline-block;"><label style="font-size:9pt; ">' + title + '</label><br><select style="width:100%; border: 1px solid #ccc; border-radius:3px; cursor:pointer;" id="' + id + '" class="crc-work-select">';
    for (var i = 0; i <= range; i++) {
        select = select + '<option>' + i * multiply + '</option>';
    }
    return select + '</select></div>';
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