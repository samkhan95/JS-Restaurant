const tables=[
    {tablename:"Table-1",listOfItems:[],costOfitems:[],noOfItems:[]},
    {tablename:"Table-2",listOfItems:[],costOfitems:[],noOfItems:[]},
    {tablename:"Table-3",listOfItems:[],costOfitems:[],noOfItems:[]}
];

localStorage.clear();
localStorage.setItem('Table-1',JSON.stringify([{'item':"Hyderabdi Chicken Biryani",'cost':269,'quantity':0},{'item':"Faham Mandi",'cost':320,'quantity':0},{'item':"Shawarma",'cost':160,'quantity':0},{'item':"French Fries",'cost':145,'quantity':0},{'item':"Apollo Fish",'cost':329,'quantity':0},{'item':"Crispy Corn",'cost':229,'quantity':0},{'item':"Cheese Garlic Bread",'cost':60,'quantity':0} ]));
localStorage.setItem('Table-2',JSON.stringify([{'item':"Hyderabdi Chicken Biryani",'cost':269,'quantity':0},{'item':"Faham Mandi",'cost':320,'quantity':0},{'item':"Shawarma",'cost':160,'quantity':0},{'item':"French Fries",'cost':145,'quantity':0},{'item':"Apollo Fish",'cost':329,'quantity':0},{'item':"Crispy Corn",'cost':229,'quantity':0},{'item':"Cheese Garlic Bread",'cost':60,'quantity':0} ]));
localStorage.setItem('Table-3',JSON.stringify([{'item':"Hyderabdi Chicken Biryani",'cost':269,'quantity':0},{'item':"Faham Mandi",'cost':320,'quantity':0},{'item':"Shawarma",'cost':160,'quantity':0},{'item':"French Fries",'cost':145,'quantity':0},{'item':"Apollo Fish",'cost':329,'quantity':0},{'item':"Crispy Corn",'cost':229,'quantity':0},{'item':"Cheese Garlic Bread",'cost':60,'quantity':0} ]));



const dishes =[
    {dishName:"Hyderabdi Chicken Biryani", price:269,cuisineType:"maincourse"},
    {dishName:"Faham Mandi", price:320,cuisineType:"maincourse"},
    {dishName:"Shawarma", price:130,cuisineType:"maincourse"},
    {dishName:"French Fries", price:145,cuisineType:"starter"},
    {dishName:"Apollo Fish", price:329,cuisineType:"starter"},
    {dishName:"Crispy Corn", price:229,cuisineType:"starter"},
    {dishName:"Cheese Garlic Bread", price:60,cuisineType:"breads"},
];


//Creating Div elements inside the div(grid-table).
function loadTables(){
    let ele = document.getElementsByClassName('grid-table');
    for(let table of tables){
        let newDiv = document.createElement("div");
        newDiv.className = `${table.tablename} table`;
        let h2 = document.createElement("h2");
        h2.innerText = table.tablename;
        let para = document.createElement("p");
        para.innerText = `Rs.0 | Total items:0`;
        para.className = "dropTarget";
        newDiv.appendChild(h2);
        newDiv.appendChild(para);
        newDiv.addEventListener("drop", dragDrop);
        newDiv.addEventListener("dragover", dragOver);
        newDiv.addEventListener("click", function(){showPopup(table.tablename)});
        ele[0].appendChild(newDiv);
    }
    // console.log(ele[0]);

}

loadTables();


//Appending div elements insidSe the div("gird-menu").
function loadMenu(){
    let ele = document.getElementsByClassName('grid-menu');
    for(let item of dishes){
        let newDiv = document.createElement("div");
        newDiv.className = `${item.cuisineType} foodItem`;
        newDiv.draggable = "true";
        newDiv.addEventListener("dragstart", dragstart);
        let h2 = document.createElement("h2");
        h2.innerText = item.dishName;
        let para = document.createElement("p");
        para.className = "dragTarget";
        para.innerText = `${item.price}.00`;
    
        newDiv.appendChild(h2);
        newDiv.appendChild(para);
        ele[0].appendChild(newDiv);
    }
}
    // console.log(ele[0]);
loadMenu();  


let tableInput = document.getElementsByClassName("searchTable");
tableInput[0].addEventListener("input",function(){
    var value = tableInput[0].value;
    filterTable(value,tables);
});

function filterTable(value, tables){
    
    for(let table of tables){
        console.log(table);
        let div = document.getElementsByClassName(table.tablename);
        
        let h2 = div[0].getElementsByTagName("h2");
        // console.log(h2);
        value = value.toLowerCase();
        let name = h2[0].innerText.toLowerCase();
        
        if(name.includes(value) || value == ""){
            div[0].style.display = "";
            
        }
        else{
            div[0].style.display = "none";
        }

    }
    
}


let menuInput = document.getElementsByClassName("searchItem");
menuInput[0].addEventListener("keyup",function(){
    var value = menuInput[0].value;
    filterMenu(value,dishes);
    // console.log(value);
});



function filterMenu(value, dishes){
    for(let dish in dishes){
        let div = document.getElementsByClassName("foodItem");
        console.log(dishes[dish]);
        let h2 = div[dish].getElementsByTagName("h2");
        // console.log(h2[0]);
        value = value.toLowerCase();
        let name = h2[0].innerText.toLowerCase();
        
        if(name.indexOf(value) > -1 || value == "" || dishes[dish].cuisineType == value){
            div[dish].style.display = "";
            
        }
        else{
            div[dish].style.display = "none";
        }

    }
    
}

// console.log(document.getElementsByClassName("searchTable")[0].value);
function clearTableSearch(){
    let clear = document.getElementsByClassName("searchTable")[0];
    clear.value = "";
    filterTable("",tables);
};

function clearMenuSearch(){
    let clear = document.getElementsByClassName("searchItem")[0];
    clear.value = "";
    filterMenu("",dishes);
};

function dragstart(ev){
    // console.log("start");
    let itemPrice = this.getElementsByTagName("p")[0].innerText;
    let itemName = this.getElementsByTagName("h2")[0].innerText;
    ev.dataTransfer.setData("text", itemPrice);
    ev.dataTransfer.setData("text2",itemName);
    // console.log(itemName,itemPrice);
    

}

function dragOver(e){
    e.preventDefault();

}
function dragDrop(ev){
    ev.preventDefault();
    let itemPrice = ev.dataTransfer.getData("text");
    let itemName = ev.dataTransfer.getData("text2");
    let classname = this.className;
    let text = this.getElementsByTagName("p")[0].innerText;
    let num1 = /\d+$/;
    let count = text.match(num1);
    let num2 = /\d+/;
    let price = text.match(num2);
    let freq = 1;
    let totalcount = parseInt(count[0])+1;
    //  console.log(itemPrice,itemName,count[0],price[0]);
    let totalprice = parseInt(itemPrice) + parseInt(price[0]);
    this.getElementsByTagName("p")[0].innerText = `Rs.${totalprice} | Total items:${totalcount}`;
    updateTables(classname,parseInt(itemPrice),freq,itemName);
    
}
function updateTables(classname,price,freq,itemName){
    for(let table of tables){
        if(classname.includes(table.tablename)){
                if(!table.listOfItems.includes(itemName)){
                    table.listOfItems.push(itemName);
                    table.costOfitems.push(price);
                    table.noOfItems.push(1);
                }
                else{
                    let index = table.listOfItems.indexOf(itemName);
                    // console.log(index);
                    table.costOfitems[index] +=price;
                    table.noOfItems[index] +=freq;
                }
            }

    }
    // console.log(tables);
    
}





function createTable(classname){
    var modalTable = document.getElementById("mTable");
    let h3 = document.getElementsByClassName("title-content")[0];
    h3.innerText = `${classname} Order Details`;
    while (modalTable.childElementCount > 1) {
        modalTable.removeChild(modalTable.lastChild);
        modalTable.childElementCount--;
    }
    let tPrice = 0;
    for(let table of tables){
        if((table.tablename).includes(classname)){
            for(let i=0;i<table.listOfItems.length;++i){
                tPrice += table.costOfitems[i];
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                var td4 = document.createElement("td");
                var input = document.createElement("input");
                var td5 = document.createElement("td");
                var del = document.createElement("showPopup");
                tr.className = "trm"
                del.className = "delete";
                td1.className = "Sno";
                td1.textContent = "" + (i + 1);
                td2.textContent = table.listOfItems[i];
                td2.className = "item";
                td3.textContent = table.costOfitems[i]/table.noOfItems[i];
                td3.className = "price";
                del.textContent = "Delete";

                input.setAttribute("type", "number");
                input.setAttribute("min", 1);
                input.addEventListener("change", function (){ AddItem(this,this.value) });
                input.setAttribute("value", table.noOfItems[i]);
                del.setAttribute("onclick", "deleteItem(this)");
                td4.appendChild(input);
                td5.appendChild(del);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                modalTable.appendChild(tr);
                // console.log(modalTable);

            }
        }
        var tb = tPrice;
        document.getElementById("TB").innerHTML = "Total Bill :" + tb;
    }
}


function closeModal(){
    let modal = document.getElementsByClassName("modal");
    modal[0].style.display = "none" ;
}

function showPopup(name){
    // console.log(name);
    let modal = document.getElementsByClassName("modal");
    for(let table of tables){
        if((table.tablename).includes(name)){
            modal[0].style.display = "block" ;
            createTable(name);
        }
    }
}


function AddItem(thiss,val){
    var parent = thiss.parentElement.parentElement;
    // console.log(thiss);
    // console.log(thiss.parentElement);
    // console.log(parent.innerHTML);
    var retrieveItemName = parent.innerHTML.split('>');
    // console.log(retrieveItemName);
    var itemName = retrieveItemName[3].substring(0,retrieveItemName[3].length-4);
//    console.log(itemName);
   let cost;
   for(let dish of dishes){
       if(dish.dishName.includes(itemName))
            cost = parseInt(dish.price);
   }
    // console.log(cost);
    let tname = document.getElementsByClassName("title-content")[0].innerText.split(" ")[0];
    //    console.log(tname);
    let BCinc = parseInt(countItemsInc(tname,itemName,cost));
    // console.log(BCinc," BCinc ==",val,"atfer =");
    
    if(val >= BCinc)
        updateTables(tname,cost,1,itemName);
    else
        updateTables(tname,cost,-1,itemName);
    let para = document.getElementsByClassName(tname)[0].getElementsByTagName("p")[0];
    //    console.log(para);
    let priceBeforeIncrement = parseInt(para.innerText.split(" ")[0].substring(3,));
    //    console.log(priceBeforeIncrement);
    let bcount = parseInt(para.innerText.split(":")[1]);
    //    console.log(bcount);
    // console.log("Bprice",priceBeforeIncrement,"BTcount=",bcount,"inc=",BCinc,"afterInc=",val);
    if(parseInt(val) >= BCinc){
        para.innerText = `Rs.${priceBeforeIncrement+(cost*(val-BCinc))} | Total Items:${bcount+parseInt(val)-BCinc}`;
        document.getElementById("TB").innerText = `Total Bill :${priceBeforeIncrement+(cost*(val-BCinc))}`;
    }
    else{
        para.innerText = `Rs.${priceBeforeIncrement-(cost*(BCinc-parseInt(val)))} | Total Items:${bcount-BCinc+parseInt(val)}`;
        document.getElementById("TB").innerText = `Total Bill :${priceBeforeIncrement-(cost*(BCinc-val))}`;
    }
        
}

function countItemsInc(tname,itemName){
    for(let table of tables){
        if(tname.includes(table.tablename)){
            for(let i=0;i<table.listOfItems.length;++i){
                // console.log(itemName,table.listOfItems[i],table.noOfItems[i]);
                if(itemName == table.listOfItems[i]){
                    return table.noOfItems[i];

                }
            }
        }
    }
}

function deleteItem(thiss){
    console.log(tables);
    let row = thiss.parentNode.parentNode;
    // console.log(row);
    let delRow = row.innerHTML.split(">");
    // console.log(delRow);
    var itemName = delRow[3].substring(0,delRow[3].length-4);
    // console.log(itemName);
    let tname = document.getElementsByClassName("title-content")[0].innerText.split(" ")[0];
    //console.log(tname);
    for(let table of tables){
        if(tname.includes(table.tablename)){
            let indexOfitem = table.listOfItems.indexOf(itemName);
            var delcount = table.noOfItems[indexOfitem];
            var delCost = table.costOfitems[indexOfitem];
            let delT =table.listOfItems.splice(indexOfitem,1);
            table.costOfitems.splice(indexOfitem,1);
            table.noOfItems.splice(indexOfitem,1);
            //  console.log("delCost ==",delCost,"delcount ==",delcount);
            let para = document.getElementsByClassName(tname)[0].getElementsByTagName("p")[0];
            // console.log(para);
            let priceBeforeDelete = parseInt(para.innerText.split(" ")[0].substring(3,));
            //   console.log(priceBeforeDelete);
            let beforeDeleteCount = parseInt(para.innerText.split(":")[1]);
            //   console.log(beforeDeleteCount);
            para.innerText = `Rs.${priceBeforeDelete-delCost} | Total Items:${beforeDeleteCount-delcount}`;
            document.getElementById("TB").innerText = `Total Bill :${priceBeforeDelete-delCost}`;
            document.getElementById("mTable").deleteRow(row.rowIndex);
            
        }
    }
    console.log(tables);
    createTable(tname);

}

function GenerateBill(thiss){
    let modal = document.getElementsByClassName("modal");
    modal[0].style.display="none";
    let tmodal = thiss.parentNode.parentNode.childNodes[1];
     tname = tmodal.childNodes[1].childNodes[1].innerText.split(" ")[0];
     console.log(tname);

    for(let table of tables){
        if(tname.includes(table.tablename)){
            let gbname = document.getElementById("GBname");
            gbname.innerText = `${tname}  Bill Details`;
            let TB = document.getElementById("TB");
            let totalAmout = parseInt(TB.innerText.split(":")[1]);
            console.log("ta ==",totalAmout,"Tb= ",TB);
            let Tbill = document.getElementById("Tbill").innerText = `Pay the bill  :Rs. ${totalAmout}`; 
            TB.innerText = "Total bill :0";
            table.listOfItems=[];
            table.costOfitems=[];
            table.noOfItems=[];
            let para = document.getElementsByClassName(tname)[0].getElementsByTagName("p")[0];
            para.innerText = `Rs.0 | Total Items: 0`;
            let gmodal = document.getElementById("gModal");
            gmodal.style.display = "block";
        }

    }

}

function closeGModal(){
    let gmodal = document.getElementById("gModal");
    gmodal.style.display="none";
}




