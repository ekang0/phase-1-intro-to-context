// Your code here
function createEmployeeRecord(array) {
  let testEmployee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return testEmployee
};

function createEmployeeRecords(arrayofArrays){
  let employeeRecords = arrayofArrays.map(array => createEmployeeRecord(array));
  return employeeRecords
};

function createTimeInEvent(recordObj, dateStamp) {
  let timeIn = {
    type: "TimeIn", 
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  };
  recordObj.timeInEvents.push(timeIn);
  return recordObj;
};

function createTimeOutEvent(recordObj, dateStamp){
  /*let timeOut = {
    type: "TimeOut",
    hour: dateStamp.split(' ')[1],
    date: dateStamp.split(' ')[0]
  }
  recordObj.timeOutEvents.push(timeOut)
  */
  recordObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  });
  return recordObj;
};

function hoursWorkedOnDate(recordObj, date){
  let dateIndexIn = recordObj.timeInEvents.findIndex(timeInElement => timeInElement.date === date);
  let dateIndexOut = recordObj.timeOutEvents.findIndex(timeOutElement => timeOutElement.date === date);
  let timeIn = recordObj.timeInEvents[dateIndexIn].hour;
  let timeOut = recordObj.timeOutEvents[dateIndexOut].hour;
  let hoursWorkedInt = (timeOut - timeIn)/100;
  return hoursWorkedInt;
};

function wagesEarnedOnDate(recordObj, date){
  let hoursWorked = hoursWorkedOnDate(recordObj, date);
  let hourlyPay = recordObj.payPerHour;
  let payOwed = hoursWorked * hourlyPay;
  return payOwed;
};

function allWagesFor(recordObj){
  let allDates = recordObj.timeInEvents.map(objElement => objElement.date);
  //array of all the dates the employee worked
  let payOwedByDate = allDates.map(date => wagesEarnedOnDate(recordObj, date));
  let totalPayAllDatesNum = payOwedByDate.reduce((previousVal, currentVal) => previousVal + currentVal);
  return totalPayAllDatesNum;
};

function calculatePayroll(arrayOfRecords){
  let arrayTotalPayAllDatesPerRecord = arrayOfRecords.map(recordObj => allWagesFor(recordObj));
  let totalPayAllDatesAllEmployees = arrayTotalPayAllDatesPerRecord.reduce((previousVal, currentValue)=> previousVal +currentValue);
  return totalPayAllDatesAllEmployees;
};