var campoFiltro = document.querySelector("#filtrar-tabela");
campoFiltro.addEventListener("input", function(){
    var pacientes = document.querySelectorAll(".paciente");
    
    if(this.value.length > 0){
        var testaFiltro = new RegExp(this.value, "i");
        pacientes.forEach(function(paciente){
            var nome = paciente.querySelector(".info-nome").textContent;
            if(!testaFiltro.test(nome)){
                paciente.classList.add("invisivel");
            }else{
                paciente.classList.remove("invisivel");
            }
        });
    }else{
        pacientes.forEach(function(paciente){
            paciente.classList.remove("invisivel");
        });
    }
});