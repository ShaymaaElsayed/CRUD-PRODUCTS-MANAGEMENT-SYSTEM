let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit= document.getElementById('submit');

let mood = 'create';
let temp;

//get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'rgb(170, 19, 127)';
    }else{
        total.innerHTML ='';
        total.style.background = 'rgb(232, 140, 203)';
    }
}
//creat producte
//*هنحط الاوبجيكت في مصفوفة علشان لو معملناش  كدة الاو بجيكت الجديد هيمسح القديم
let dataproduct;
if(localStorage.product != null)
{//*add localStorage.product in dataproduct
    dataproduct = JSON.parse(localStorage.product);
}else{
    dataproduct = [];
}
submit.onclick = function()
{
    //object
    let newproduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    
    //rtansform from create to update
    if(title.value != '' && price.value !='' && category.value != '' && newproduct.count < 100){
        if(mood === 'create'){
            //count
            if(newproduct.count > 1){
                for(let i = 0; i<newproduct.count; i++){
                    dataproduct.push(newproduct);
                }
            }else{
                dataproduct.push(newproduct);
            }
        }else{
            dataproduct[temp] = newproduct;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        cleareData();
        
    }
    
    
    //save localstorage
    localStorage.setItem('product', JSON.stringify(dataproduct));
    //cleare inpute after create
    showData();
}
//cleare inpute
function cleareData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//read
function showData()
{
    getTotal();
    let table = '';
    for(let i = 0; i<dataproduct.length; i++){
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataproduct[i].title}</td>
            <td>${dataproduct[i].price}</td>
            <td>${dataproduct[i].taxes}</td>
            <td>${dataproduct[i].ads}</td>
            <td>${dataproduct[i].discount}</td>
            <td>${dataproduct[i].total}</td>
            <td>${dataproduct[i].category}</td>
            <td>
            <button onclick="updatData(${i})" id="update">update</button>
            </td>
            <td>
            <button onclick="deleteDat(${i})" id="delete">delete</button>
            </td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btndeleteAll = document.getElementById('deleteAll');
    if(dataproduct.length > 0){
        btndeleteAll.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataproduct.length})</button>
        `
    }else{
        btndeleteAll.innerHTML = '';
    }
}
showData();
//delete one producr
function deleteDat(i)
{
    dataproduct.splice(i,1);
    localStorage.product = JSON.stringify(dataproduct);
    showData();
}
//delet All
function deleteAll()
{
    localStorage.clear();
    dataproduct.splice(0);
    showData();
}
//update
function updatData(i)
{
    title.value = dataproduct[i].title;
    price.value = dataproduct[i].price;
    taxes.value = dataproduct[i].taxes;
    ads.value = dataproduct[i].ads;
    discount.value = dataproduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataproduct[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}
//search
let searchMode = 'title';
function getsearchMode(id)
{
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMode = 'title';
    }else{
        searchMode = 'category';
    }
    search.placeholder = 'Search By ' +searchMode;
    search.focus();
    search.value = '';
    showData();
}
function searchData(value)
{
    let table = '';
    for(let i = 0; i<dataproduct.length; i++){
        if (searchMode == 'title'){
        
            if(dataproduct[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].category}</td>
                    <td><button onclick="updatData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteDat(${i})" id="delete">delete</button></td>
                </tr>
                     `;
            }
            
        
        }else{
        
            if(dataproduct[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].category}</td>
                    <td><button onclick="updatData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteDat(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
            
        

    }
    }
    
    document.getElementById('tbody').innerHTML = table;
}
//clean data

