// ==UserScript==
// @name         Jira_work_time
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       vbrichenko@croc.ru
// @match        https://jira.croc.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Идентификатор поля ввода затраченного времени
    const WORK_TIME_INPUT = '#log-work-time-logged';

    /**
     * Метод строит и возвращает div - блок с селектом по заданным параметрам.
     * @param title    - заголовок
     * @param id       - уникальный id
     * @param range    - ограничение значений сверху
     * @param multiply - множитель значений
     * @return div - блок со всем добром
     */
    function buildSelect(title, id, range, multiply){
        var select = '<div style="height:100%; margin: 0 5px; float:left; display:inline-block;"><label style="font-size:9pt; ">'+title+'</label><br><select style="width:100%; border: 1px solid #ccc; border-radius:3px; cursor:pointer;" id="'+id+'" class="crc-work-select">';
        for (var i = 0; i<= range; i++){
            select = select + '<option>' + i * multiply + '</option>';
        }
        return select + '</select></div>';
    }

    //Строим необходимые селекты
    var selectWeek= buildSelect('Недели','crcWeek', 9, 1);
    var selectDay = buildSelect('Дни','crcDay', 4, 1);
    var selectHour = buildSelect('Часы','crcHour', 9, 1);
    var selectMinute = buildSelect('Минуты','crcMinute', 5, 10);

    //Компонуем итоговый блок с селектами
    const wrapper = '<div id="crcWorkTime" style="background-color:white; position:absolute;  margin:-7px 0 0 169px; padding: 0 3px 3px 3px; z-index:9999; border-radius:3px; box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.48);">'+selectWeek+selectDay+selectHour+selectMinute+'</div>';

    AJS.$(document).ready(function(){
        /**
         * Обрабатывает нажатие на поле ввода затраченного времени
         */
        AJS.$(document).on('click',WORK_TIME_INPUT, function(){
            // Расширяем поле ввода, чтобы помещались все значения, без обрезания
            AJS.$(this).addClass('medium-field').removeClass('short-field');
            // Если блок с селектами уже встроили в страницу, просто управляем его отображением
            if ( AJS.$(document).find('#crcWorkTime').length !== 0) {
                AJS.$(this).prev().toggle();
            } else {
                //Иначе добавляем блок в код страницы
                AJS.$(wrapper).insertBefore(AJS.$(this));
             }
         });

       /**
        * Обрабатывает выбор значения из сетлекта
        */
        AJS.$(document).on('change',".crc-work-select", function(){
            //Получаем количество недель, если 0 - не выводим
            var week = (AJS.$(document).find("#crcWeek").val() !== '0') ? AJS.$(document).find("#crcWeek").val()+'w ' : '';
            //Получаем количество дней, если 0 - не выводим
            var day = (AJS.$(document).find("#crcDay").val() !== '0') ? AJS.$(document).find("#crcDay").val()+'d ' : '';
            //Получаем количество часов, если 0 - не выводим
            var hour = (AJS.$(document).find("#crcHour").val() !== '0') ? AJS.$(document).find("#crcHour").val()+'h ' : '';
            //Получаем количество минут, если 0 - не выводим
            var minute = (AJS.$(document).find("#crcMinute").val() !== '0') ? AJS.$(document).find("#crcMinute").val()+'m ' : '';
            //Обновляем значение поля
            AJS.$(document).find(WORK_TIME_INPUT).val(week + day + hour + minute);
        });
    });
})();