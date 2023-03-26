var dados = [] //criação do array

function ApagaRegistro(id) {
  let _confirm = confirm("Desejas realmente apagar este registro?")

  if (_confirm) {
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].ID == id) {
        //a funcao splice recebe dois parametros
        //o indice que eu desejo apagar + a quantidade para frente de indices que eu desejo apagar
        //neste caso desejo apagar os o campo que foi clicado na table
        dados.splice(i, 1)
      }
    }
    PopulaTabela()
  }
}
function EditaRegistro(id) {
  $("#modalRegistro").modal("show")

  dados.forEach(function (item) {
    if (item.ID == id) {
      $("#hdID").val(item.ID)
      $("#txtNome").val(item.Nome)
      $("#txtSobrenome").val(item.Sobrenome)
      $("#txtDtNascimento").val(item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3, 2) + "-" + item.DtNascimento.substr(0, 2))
      $("#txtFormacao").val(item.Formacao)
    }
  })
}


function PopulaTabela() {
  if (Array.isArray(dados)) { //verifica se realmente é arryay

    localStorage.setItem("__dados__", JSON.stringify(dados))

    $("#tblDados tbody").html("") //text jquery limpando o tbody da tabela

    dados.forEach(function (item) { //varredura por todo o array
      //TEMPLATE STRING
      $("#tblDados tbody").append(`<tr>
      <td>${item.ID}</td>
      <td>${item.Nome}</td>
      <td>${item.Sobrenome}</td>
      <td>${item.DtNascimento}</td>
      <td>${item.Formacao}</td>
      <td><button type="button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.ID});"><i class="fa fa-edit"></button></td>
      <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"><i class="fa fa-trash"></button></td>
      </tr>`) //adicionar um trecho html a cada execução
    })
  }
}
$(function () {
  //EXECUTA AO CARREGAR DA TELA
  dados = JSON.parse(localStorage.getItem("__dados__"))
  if (dados) {
    PopulaTabela()
  }
  $("#btnSalvar").click(function () {
    //evento click do botao salvar
    let _id = $("#hdID").val()
    let Nome = $("#txtNome").val()
    let Sobrenome = $("#txtSobrenome").val()
    let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
    let Formacao = $("#txtFormacao").val()
    let registro = {}
    registro.Nome = Nome
    registro.Sobrenome = Sobrenome
    registro.DtNascimento = DtNascimento
    registro.Formacao = Formacao

    if (!_id || _id == "0") {
      registro.ID = dados.length + 1
      dados.push(registro)
    } else {
      dados.forEach(function (item) {
        if (item.ID == _id) {
          item.Nome = Nome
          item.Sobrenome = Sobrenome
          item.DtNascimento = DtNascimento
          item.Formacao = Formacao
        }
      })
    }
    alert("Registro salvo com sucesso")
    $("#modalRegistro").modal("hide")

    //limpeza dos campos
    $("#hdID").val("0")
    $("#txtNome").val("")
    $("#txtSobrenome").val("")
    $("#txtDtNascimento").val("")
    $("#txtFormacao").val("")

    PopulaTabela()
  })
})