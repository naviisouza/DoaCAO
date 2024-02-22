$(document).ready(function() {
  $("#datepicker").datepicker({
    dateFormat: 'dd/mm/yy',
    minDate: moment().toDate(), // Impede a seleção do dia atual ou anterior
    beforeShowDay: function(date) {
      var currentDate = moment().startOf('day');
      var selectedDate = moment(date).startOf('day');
      return [selectedDate.isAfter(currentDate)];
    },
    onSelect: function(dateText, inst) {
      // Aqui você pode executar alguma ação quando o usuário selecionar uma data
      console.log("Data selecionada: " + dateText);
    }
  });

  $("label[for='datepicker']").click(function() {
    $("#datepicker").datepicker("show");
  });
});
// function handleDropdownChange() {
//   var dropdown = document.getElementById("itens");
//   var selectedValue = dropdown.value;
//   var nomeMedicamento = document.getElementById("nome-medicamento");

//   if (selectedValue === "medicamentos") {
//     nomeMedicamento.style.display = "block";
//   } else {
//     nomeMedicamento.style.display = "none";
//   }
// }

var decreaseButton = document.getElementById("decreaseButton");
    var increaseButton = document.getElementById("increaseButton");
    var unitValue = document.getElementById("unitValue");

    // decreaseButton.addEventListener("click", function() {
    //   var value = parseInt(unitValue.innerText);
    //   if (value > 1) {
    //     value--;
    //     unitValue.innerText = value;
    //   }
    // });

    // increaseButton.addEventListener("click", function() {
    //   var value = parseInt(unitValue.innerText);
    //   value++;
    //   unitValue.innerText = value;
    // });

   
        document.getElementById('cadastrar').addEventListener('click', function() {
          document.getElementById('popup1').style.display = 'block';
        });
      
        document.getElementById('close-button').addEventListener('click', function() {
          document.getElementById('popup1').style.display = 'none';
        });
    
    

        function cadastrarDoacao() {
          const date = document.getElementById("datepicker").value;
          const type = document.getElementById("itens").value;
          const description = document.getElementById("description").value;
          const status = "em andamento";
          const donor = localStorage.getItem('id');
          const token = localStorage.getItem('token');
          const horario = document.getElementById("horario").value;
        
          const doacao = {
            type: type,
            description: description,
            status: status,
            date: date+" "+horario,
            donor: donor,
          };
        
          console.log(doacao);
        
          var url = "https://api-doacao.onrender.com/api/doacoes";
          var options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token  // Adiciona o header de autenticação com o token
            },
            body: JSON.stringify(doacao)
          };
        
          // Faz a chamada fetch
          fetch(url, options)
            .then(response => {
              if (response.ok) {
                // Doação cadastrada com sucesso
                alert("A doação foi cadastrada!");
              } else {
                // Horário não disponível
                alert("O horário selecionado não está disponível. Por favor, escolha outro horário.");
              }
              return response.json();
            })
            .then(data => {
              console.log(data.msg);
            })
            .catch(error => {
              console.error('Erro:', error);
            });
        }
         