
let inputDate = document.querySelectorAll('.record__date-item1');
 let inputTime = document.querySelectorAll('.record__date-item2');

/*--------------------------*/
var Cal = function(divId) {
  //Сохраняем идентификатор div
  this.divId = divId;
  // Дни недели с понедельника
  this.DaysOfWeek = [
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вс'
  ];
    // Месяцы начиная с января
  this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  //Устанавливаем текущий месяц, год
  var d = new Date();
  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();
};
// Переход к следующему месяцу
Cal.prototype.nextMonth = function() {
  if ( this.currMonth == 11 ) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  }
  else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};
// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function() {
  if ( this.currMonth == 0 ) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  }
  else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};
// Показать текущий месяц
Cal.prototype.showcurr = function() {
  this.showMonth(this.currYear, this.currMonth);
};
// Показать месяц (год, месяц)
Cal.prototype.showMonth = function(y, m) {
  var d = new Date()
  // Первый день недели в выбранном месяце 
  , firstDayOfMonth = new Date(y, m, 7).getDay()
  // Последний день выбранного месяца
  , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
  // Последний день предыдущего месяца
  , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  var html = '<table>';
   // Запись выбранного месяца и года
  html += '<thead><tr>';
  html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
  html += '</tr></thead>';
  // заголовок дней недели
  html += '<tr class="days">';
  for(var i=0; i < this.DaysOfWeek.length;i++) {
    html += '<td>' + this.DaysOfWeek[i] + '</td>';
  }
  html += '</tr>';

  //Записываем дни
   var i=1;
  do {
    var dow = new Date(y, m, i).getDay();
    // Начать новую строку в понедельник
    if ( dow == 1 ) {
      html += '<tr>';
    }

      // Если первый день недели не понедельник показать последние дни предыдущего месяца
    else if ( i == 1 ) {
      html += '<tr>';
      var k = lastDayOfLastMonth - firstDayOfMonth+1;
      for(var j=0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }

      // Записываем текущий день в цикл
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += '<td class="today">' + i + '</td>';
    } else {
      html += '<td class="normal">' + i + '</td>';
    }

        // закрыть строку в воскресенье
    if ( dow == 0 ) {
      html += '</tr>';
    }
    // Если последний день месяца не воскресенье, показать первые дни следующего месяца
    else if ( i == lastDateOfMonth ) {
      var k=1;
      for(dow; dow < 7; dow++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }
    i++;
  }while(i <= lastDateOfMonth);

    // Конец таблицы
  html += '</table>';
  // Записываем HTML в div
  document.getElementById(this.divId).innerHTML = html;
   /*-------------------------------------------*/
  let calendarDate1 = document.querySelectorAll('td.normal,td.today');
  calendarDate = Array.from(calendarDate1)

  for (let i = 0; i < calendarDate.length; i++){
    calendarDate[i].onclick = function(){
    for (let i = 0; i < calendarDate.length; i++){
     calendarDate[i].classList.remove('active'); 
    }  
   let onclickData = calendarDate[i];
    inputValueDate = calendarDate[i].textContent;
    inputTime.value = '';
    onclickData.classList.toggle('active');
  
    //Месяц в Input:
    let calendarMonth = document.querySelector('#divCal');
   let itemMonth = calendarMonth.querySelector('thead').querySelector('td').textContent;
    let itemMonthArray = itemMonth.split(' ');
  
    let inputMonth;
   if(itemMonthArray[0] == 'Март' || itemMonthArray[0] == 'Август'){
      inputMonth = itemMonthArray[0] + 'а';
   } else{
     inputMonth = itemMonthArray[0].slice(0, -1) + "я";
   }
  /* inputDate.textContent=inputValueDate + " " + inputMonth + " " + itemMonthArray[1]; */
   for(let i = 0; i < inputDate.length; i++){
     inputDate[i].textContent=inputValueDate + " " + inputMonth + " " + itemMonthArray[1];
     console.log(inputDate[i]);
   }

  

   //неделя(массив)
   let week = Array.from(onclickData.parentElement.children);
   //находим день недели:
     let weekday = week.indexOf(onclickData) + 1;

 

 

  }
  } 

  /*----------------------------------------------------*/
};

const calendar1 = document.querySelector('#divCal');
const calendar2 = document.querySelector('#divCalendar');
// При загрузке окна
window.onload = function() {
  if(calendar1){
  // Начать календарь
  var c = new Cal("divCal");      
  c.showcurr();

    // Привязываем кнопки «Следующий» и «Предыдущий»
  getId('btnNext').onclick = function() {
    c.nextMonth();
  };
  getId('btnPrev').onclick = function() {
    c.previousMonth();
  };
  }

  if(calendar2){
    // Начать календарь
  
  var c1 = new Cal("divCalendar");      
  c1.showcurr();

    // Привязываем кнопки «Следующий» и «Предыдущий»
  getId('btnNext1').onclick = function() {
    c1.nextMonth();
  };
  getId('btnPrev1').onclick = function() {
    c1.previousMonth();
  };
}
}
// Получить элемент по id
function getId(id) {
  return document.getElementById(id);
}



/*-----------Время записи--------------*/

 
 let timeTdAll = document.querySelectorAll('.time__td');

  let timeTdArray = Array.from(timeTdAll);
 
  for(let i = 0; i < timeTdArray.length; i++){
    timeTdArray[i].onclick = function(){
       for(let i = 0; i < timeTdArray.length; i++){
         timeTdArray[i].classList.remove('active');
       }
    
      timeTdArray[i].classList.toggle('active');
      let timeTd = timeTdArray[i];
    //Время в input-time:
      for(let i=0; i<inputTime.length; i++){
        inputTime[i].textContent = "  " + timeTd.textContent;
      }
     
    }
  }