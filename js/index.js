let forms = document.querySelector('#forms');
let datesInput = document.querySelector('#dates');
let messages = document.querySelector('#message');
let contentStore = document.querySelector('#show-content');

// current dates
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if(day < 10){
        day = '0' + day
    }
    if(month < 10){
        month = '0' + month
    }
    let finialDate = `${year}-${month}-${day}`;


forms.addEventListener('submit', function(e){
    e.preventDefault();
    if(false){
        alert('fillUp All The Gap')
    }else{
        acceptData();
       
    }
});

let dataArr = [];
function acceptData(){
    let dataSore = {
        date : datesInput.value,
        message : messages.value
    }
    dataArr.push(dataSore);
    localStorage.setItem('infos', JSON.stringify(dataArr));
    displayData()
};

function displayData(){
    contentStore.innerHTML = '';
    dataArr.map((data, index)=>{
        contentStore.innerHTML += `
            <tr id=${index}>
                <td>${data.date}</td>
                <td>${data.message}</td>
                <td><a onclick="deletesFun(this)" href="" class="btn btn-danger">X</a></td>
            </tr>
        `
        
    });

}
console.log(finialDate)


function deletesFun(e){
    e.parentElement.parentElement.remove();
    let num = e.parentElement.parentElement.id;
    dataArr.splice(num, 1);
    localStorage.setItem('infos', JSON.stringify(dataArr));
}


function messageAlert(){
    Notification.requestPermission().then((perme)=>{
       dataArr.map((dates)=>{
            if(dates.date === finialDate){
                setInterval(()=>{
                    new Notification('This Message For You Remaine Message', {
                        body : dates.message
                    });
                }, 200000);
            }
       });
    })
};


(()=>{
    dataArr = JSON.parse(localStorage.getItem('infos'));
    displayData();
    messageAlert()
})();