// Criando a lista de compras
var cadastro = [];

// Salvando os Dados em Json
function saveListStorage(cadastro){
	var jsonStr = JSON.stringify(cadastro);
	localStorage.setItem("cadastro",jsonStr);
}

// Identifica o Registro Salvo
function initListStorage(){
	var testList = localStorage.getItem("cadastro");
	if(testList){
		cadastro = JSON.parse(testList);
	}
	setList(cadastro);
}
initListStorage();

//Criando a Tabela no Front-End
function setList(cadastro){
	var table = '<thead class="table-dark"><tr><td></td><td>Nome</td><td>Email</td><td>Status</td><td>Ação</td></tr></thead><tbody>';
	for(var key in cadastro){
		table += '<tr><td></td><td>'+ formatNome(cadastro[key].nome) +'</td><td>'+ formatEmail(cadastro[key].email) +'</td><td>'+ formatStatus(cadastro[key].status) +'</td><td><img src="img/edit.png" width="25px" onclick="setUpdate('+key+');">&nbsp&nbsp&nbsp<img src="img/trash.png" width="25px" onclick="deleteData('+key+');"></td></tr>';
	}
	table += '</tbody>';
	document.getElementById('listTable').innerHTML = table;
	saveListStorage(cadastro);
}

function formatNome(nome){
	var str = nome.toUpperCase();
	return str;
}

function formatEmail(email){
	var str = email.toLowerCase();
	return str;
}

function formatStatus(status){
	var str = status.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

function addData(){
	var senha = document.getElementById("senha").value;
	var csenha = document.getElementById("csenha").value;
	if(senha == csenha){
		var nome = document.getElementById("nome").value;
		var sobrenome = document.getElementById("sobrenome").value;
		var email = document.getElementById("email").value;
		var status = document.getElementById("status").value;
		cadastro.unshift({"nome":nome, "sobrenome":sobrenome,"email":email, "status":status, "senha":senha});
		setList(cadastro);
		resetForm();
	}
	else{
		alert("As senhas não conferem !");
	}
}

function resetForm(){
	document.getElementById("nome").value="";
	document.getElementById("sobrenome").value="";
	document.getElementById("email").value="";
	document.getElementById("status").value="";
	document.getElementById("senha").value="";
	document.getElementById("csenha").value="";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	document.getElementById("inputIDUpdate").innerHTML = "";
}

function setUpdate(id){
	var obj = cadastro[id];
	document.getElementById("nome").value = obj.nome;
	document.getElementById("sobrenome").value = obj.sobrenome;
	document.getElementById("email").value = obj.email;
	document.getElementById("status").value = obj.status;
	document.getElementById("senha").value = obj.senha;
	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";
	document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function updateData(){
	var senha = document.getElementById("senha").value;
	var csenha = document.getElementById("csenha").value;
	if(senha == csenha){
		var id = document.getElementById("idUpdate").value;
		var nome = document.getElementById("nome").value;
		var sobrenome = document.getElementById("sobrenome").value;
		var email = document.getElementById("email").value;
		var status = document.getElementById("status").value;
		cadastro[id] = ({"nome":nome, "sobrenome":sobrenome,"email":email, "status":status, "senha":senha});
		setList(cadastro);
		resetForm();
	}
	else{
		alert("As senhas não conferem !")
	}
}

function deleteData(id){
	if(confirm("Confirma Exclusão(S/N)?")){
		if(id == cadastro.length - 1){
			cadastro.pop();
		}
		else if(id == 0){
			cadastro.shift();
		}
		else{
			var arrAuxIni = cadastro.slice(0,id);
			var arrAuxEnd = cadastro.slice(id + 1);
			cadastro = arrAuxIni.concat(arrAuxEnd);
		}
		setList(cadastro);
	}
}

function deleteList(){
	if(confirm("Deseja Apagar Todos os Registros(S/N)?")){
		cadastro = [];
		setList(cadastro);
	}
}