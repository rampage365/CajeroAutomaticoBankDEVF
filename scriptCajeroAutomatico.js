//cuentas de los usuarios del sistema
var cuentas = [
    { nombre: "Mali", saldo:200 ,password:'helloworld' },
    { nombre: "Gera", saldo:290 ,password:'133t' },
    { nombre: "Maui", saldo:67 ,password: '123' }
];
//variables globales del usuario actual en el sistema
var userNames;
var userPassword;
var nuevoMontoTotalDepositado;
const limiteMax = 990;
const limiteMin = 10;

//para sobreescribir el main general con la segunda vista
const divMain = document.getElementById('id_main_general');
//para mandar mensaje de erro en el login
const divLoginAviso = document.getElementById('id_login_aviso');

function obtenerDatosLogin() {
    limpiarErrorLogin();
    userNames = document.getElementById("userName").value;
    userPassword = document.getElementById('userPassword').value;
    /*console.log("usuario y contraeña ingresados" + userNames + userPassword);*/
    console.log("Recorriendo el array de objetos (pruebita de nombres)");
    var contador=0;
    cuentas.forEach((objeto) => {
        //console.log(objeto.nombre);
        if (objeto.nombre == userNames) {
            console.log("Usuario correcto");
            if (objeto.password == userPassword) {
                console.log("Contraseña correcta");
                console.log("Cargar segunda vista");
                nuevoMontoTotalDepositado = objeto.saldo;
                segundaVista();
                let divWelcome = document.getElementById('welcome_user');
                let HTMLString = `Bienvenido ` + objeto.nombre + `, un gusto tenerte de nuevo.`;
                divWelcome.innerHTML = HTMLString;
            } 
            else {
                console.log("Contraseña incorrecta");
                avisoErrorLogin('id_login_aviso','id_login_aviso2',`Contraseña incorrecta`,'login-aviso','login-aviso2','login-aviso-error','login-aviso-error2');
            }
        }
        else{
            contador++;
            if (contador>=3) {
                console.log("Usuario incorrecto");
                avisoErrorLogin('id_login_aviso','id_login_aviso2',`Usuario incorrecto`,'login-aviso','login-aviso2','login-aviso-error','login-aviso-error2'); 
            } else {
                console.log("Se encontro al usuario");
            }
        }
    });
}

function segundaVista() {
    let HTMLString = `
    <div class="operaciones_center">
    <h1 class="center2_horizontal" id="welcome_user">Bienvenido, un gusto tenerte de nuevo.
    </h1>
    <div class="buttons_center">
      <h2 class="second_title" >Elija la operacion que desea ejecutar</h2>
      <div class="org_flex_gen">
        <div>
          <div class="one_field">
              <button class="consultar_saldo" id="btn-consultar">Consultar</button>
          </div>  
          <div class="two_field one_field">
              <button class=" depositar_saldo" id="btn-depositar">Depositar</button>
          </div>
        </div>
        <div>
          <div class="one_field">
              <button class="retirar_saldo" id="btn-retirar">Retirar</button>
          </div>
          <div class="two_field one_field">
              <button class="salir_saldo" id="btn-salir">Salir</button>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div id="modal_container_depositar" class="modal-container-depositar">
  <div class="div-gen-001">
      <div class="div-top-uno">
          <div >
              <div class="ok-cierre">
                  <div class="cierre" id="close">X
                  </div>
              </div>
        </div>
      </div>
    <main id="container">
      <div class="div-top">
        <h3>Ingrese el monto a depositar</h3>
      </div>
      <div class="div-top-center1">
        <div class="rojo"></div>
        <input  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type="number" id="cantidad_deposito" class="cantidad-deposito" name="tentacles" min="1" max="980" maxlength="3">
        <div class="verde"></div>
      </div>
      <div class="div-top-center2">
        <div class="neutro-aviso" id="id_de_aviso">(sin ejecutar)</div>
      </div>
      <div class="div-bottom">
        <button id="btn_depositar_go" class="btn-depositar-go">Depositar</button>
        <button id="close2" class="boton-cerrar">Cerrar</button>
      </div>
    </main>
    </div>
</div>



<div id="modal_container_consultar" class="modal-container-consultar">
  <div class="div-gen-002">
      <div class="div-top-uno">
          <div >
              <div class="ok-cierre2">
                  <div class="cierre" id="closeConsultar">X
                  </div>
              </div>
        </div>
      </div>
    <main id="container">
      <div class="div-top-top">
        <h3>Saldo Actual</h3>
      </div>
      <div class="div-top-center2">
        <div class="exito-aviso" id="idConsulta_de_aviso">()</div>
      </div>
      <div class="div-bottom">
        <button id="closeConsultar2" class="boton-cerrar">Cerrar</button>
      </div>
    </main>
    </div>
</div>




<div id="modal_container_retirar" class="modal-container-retirar">
  <div class="div-gen-retirar">
      <div class="div-top-uno">
          <div >
              <div class="ok-cierre-retirar">
                  <div class="cierre" id="closeRetirar">X
                  </div>
              </div>
        </div>
      </div>
    <main id="container">
      <div class="div-top-top">
        <h3>Ingrese el monto a retirar</h3>
      </div>
      <div class="div-top-center1">
        <div class="rojo"></div>
        <input  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type="number" id="cantidad_retiro" class="cantidad-deposito" name="tentacles" min="1" max="980" maxlength="3">
        <div class="verde"></div>
      </div>
      <div class="div-top-center2">
        <div class="neutro-aviso" id="idRetirar_de_aviso">(sin ejecutar)</div>
      </div>
      <div class="div-bottom">
        <button id="btn_retirar_go" class="btn-retirar-go">Retirar</button>
        <button id="closeRetirar2" class="boton-cerrar">Cerrar</button>
      </div>
    </main>
    </div>
</div>





<div id="modal_container_salir" class="modal-container-salir">
  <div class="div-gen-salir">
      <div class="div-top-uno">
          <div >
              <div class="ok-cierre-salir">
                  <div class="cierre" id="closeSalir">X
                  </div>
              </div>
        </div>
      </div>
    <main id="container">
      <div class="div-top-top">
        <h3>Esta seguro que desea salir?</h3>
      </div>
      <div class="div-bottom">
        <button id="btn_salir_go" class="btn-salir-go">SI</button>
        <button id="closeSalir2" class="boton-cerrar">NO</button>
      </div>
    </main>
    </div>
</div>
	`;
	divMain.innerHTML = HTMLString;

    /*********************************************
     **********PARA DEPOSITAR SALDO***************
     *********************************************/
    let open = document.getElementById('btn-depositar');
    let modal_container_depositar = document.getElementById('modal_container_depositar');
    let close = document.getElementById('close');
    let close2 = document.getElementById('close2');
    let btn_depositar_go = document.getElementById('btn_depositar_go');

    open.addEventListener('click', () => {
        modal_container_depositar.classList.add('show');  
    });

    close.addEventListener('click', () => {
        modal_container_depositar.classList.remove('show');
        avisoDepositosRetiros('id_de_aviso',`(sin ejecutar)`,3);
        cantidad_deposito.value="";
    });

    close2.addEventListener('click', () => {
        modal_container_depositar.classList.remove('show');
        avisoDepositosRetiros('id_de_aviso',`(sin ejecutar)`,3);
        cantidad_deposito.value="";
    });
    btn_depositar_go.addEventListener('click',depositarGo);
    /************FIN DEPOSITAR SALDO**************/

    /*********************************************
     **********PARA CONSULTAR SALDO***************
     *********************************************/
    let openConsultar = document.getElementById('btn-consultar');
    let modal_container_consultar = document.getElementById('modal_container_consultar');
    let closeConsultar = document.getElementById('closeConsultar');
    let closeConsultar2 = document.getElementById('closeConsultar2');
    
    /*openConsultar.addEventListener('click',consultarGo);*/

    openConsultar.addEventListener('click', () => {
        consultarGo();
        modal_container_consultar.classList.add('show');
    });


    closeConsultar.addEventListener('click', () => {
        modal_container_consultar.classList.remove('show');
    });

    closeConsultar2.addEventListener('click', () => {
        modal_container_consultar.classList.remove('show');
    });
    /************FIN CONSULTAR SALDO**************/

    /*********************************************
     **********PARA RETIRAR SALDO***************
     *********************************************/
    let openRetirar = document.getElementById('btn-retirar');
    let modal_container_retirar = document.getElementById('modal_container_retirar');
    let closeRetirar = document.getElementById('closeRetirar');
    let closeRetirar2 = document.getElementById('closeRetirar2');
    let btn_retirar_go = document.getElementById('btn_retirar_go');

    openRetirar.addEventListener('click', () => {
        modal_container_retirar.classList.add('show');  
    });

    closeRetirar.addEventListener('click', () => {
        modal_container_retirar.classList.remove('show');
        let divError = document.getElementById('idRetirar_de_aviso');
        let HTMLString = `(sin ejecutar)`;
        divError.innerHTML = HTMLString;
        divError.classList.remove('error-aviso');
        divError.classList.remove('exito-aviso');
        divError.classList.add('neutro-aviso');
        cantidad_retiro.value ="";
    });

    closeRetirar2.addEventListener('click', () => {
        modal_container_retirar.classList.remove('show');
        let divError = document.getElementById('idRetirar_de_aviso');
        let HTMLString = `(sin ejecutar)`;
        divError.innerHTML = HTMLString;
        divError.classList.remove('error-aviso');
        divError.classList.remove('exito-aviso');
        divError.classList.add('neutro-aviso');
        cantidad_retiro.value ="";
    });

    btn_retirar_go.addEventListener('click',retirarGo);
    /************FIN RETIRAR SALDO**************/

    /*********************************************
     **********PARA SALIR DE TODO***************
     *********************************************/
    let openSalir = document.getElementById('btn-salir');
    let modal_container_salir = document.getElementById('modal_container_salir');
    let closeSalir = document.getElementById('closeSalir');
    let closeSalir2 = document.getElementById('closeSalir2');
    let btn_salir_go = document.getElementById('btn_salir_go');

    openSalir.addEventListener('click', () => {
        modal_container_salir.classList.add('show');  
    });

    closeSalir.addEventListener('click', () => {
        modal_container_salir.classList.remove('show');
    });

    closeSalir2.addEventListener('click', () => {
        modal_container_salir.classList.remove('show');
    });

    btn_salir_go.addEventListener('click',salirGo);
}

/*********************** FUNCIONES PARA DAR AVISOS ****************************/

function avisoErrorLogin(parametroId1,parametroId2,mensajeId,removerUno,removerDos, agregarUno,agregarDos) {
    let divError1 = document.getElementById(parametroId1);
    let divError2 = document.getElementById(parametroId2);
    let HTMLString = mensajeId;
    divError2.innerHTML = HTMLString;
    divError1.classList.remove(removerUno);
    divError1.classList.add(agregarUno);
    divError2.classList.remove(removerDos);
    divError2.classList.add(agregarDos);
    HTMLString ="";
}

function limpiarErrorLogin() {
    avisoErrorLogin('id_login_aviso','id_login_aviso2',`Contraseña incorrecta`,'login-aviso','login-aviso2','login-aviso-error','login-aviso-error2');
    let divError = document.getElementById('id_login_aviso');
    let divError2 = document.getElementById('id_login_aviso2');
    let HTMLString = "";
    divError2.innerHTML = HTMLString;
    divError.classList.remove('login-aviso-error');
    divError.classList.add('login-aviso');
    divError2.classList.remove('login-aviso-error2');
    divError2.classList.add('login-aviso2');

}

function avisoDepositosRetiros(parametroId,mensajeId,accion) {
    let divError = document.getElementById(parametroId);
    let HTMLString = mensajeId;
    divError.innerHTML = HTMLString;
    if (accion==true) {
        divError.classList.remove('neutro-aviso');
        divError.classList.remove('error-aviso');
        divError.classList.add('exito-aviso'); 
    } 
    else if(accion==false) {
        divError.classList.remove('neutro-aviso');
        divError.classList.remove('exito-aviso');
        divError.classList.add('error-aviso');  
    }
    else if(accion==3){
        divError.classList.remove('error-aviso');
        divError.classList.remove('exito-aviso');
        divError.classList.add('neutro-aviso');
    }
}

/*********************** FIN FUNCIONES PARA DAR AVISOS ****************************/


function depositarGo() {
    var montoDeposito = Number(document.getElementById("cantidad_deposito").value);

    console.log("El monto del deposito es " + montoDeposito);
    console.log("El monto del deposito anterior es de " + nuevoMontoTotalDepositado);
    /*let divError = document.getElementById('id_de_aviso');*/
    var totalxd = montoDeposito + nuevoMontoTotalDepositado;
    console.log("total a comparar" + totalxd);

    if((montoDeposito==0) || (montoDeposito%1)!=0){
        avisoDepositosRetiros('id_de_aviso',`Deposito Fallido (ingresa un numero entero y mayor a cero)`,false);
        cantidad_deposito.value="";
    }
    
    else if (totalxd>990) {
        avisoDepositosRetiros('id_de_aviso',`Deposito Fallido(excede el maximo saldo de 990)`,false);
        cantidad_deposito.value="";
    } 
    else if((montoDeposito + nuevoMontoTotalDepositado)<=990)
    {
        if ((montoDeposito + nuevoMontoTotalDepositado)==990) {
            avisoDepositosRetiros('id_de_aviso',`Deposito exitoso (limite de saldo de 990 alcanzado)`,true);
            nuevoMontoTotalDepositado = totalxd;
            insertarNuevoSaldo();
            cantidad_deposito.value="";
        }
        else{
            avisoDepositosRetiros('id_de_aviso',`Deposito exitoso`,true);
            nuevoMontoTotalDepositado = totalxd;
            insertarNuevoSaldo();
            cantidad_deposito.value="";
        }
    }
    else if (montoDeposito>980) {
        avisoDepositosRetiros('id_de_aviso',`Deposito Fallido (excede el maximo saldo de 990)`,false);
         cantidad_deposito.value="";
    } 
}

function insertarNuevoSaldo() {
    console.log("Recorriendo el array de objetos (insertarNuevoSaldo)");
    cuentas.forEach((objeto) => {
        //console.log(objeto.nombre);
        if (objeto.nombre == userNames) {
            console.log("Usuario correcto");
            if (objeto.password == userPassword) {
                console.log("Contraseña correcta");
                console.log("insertando nuevo saldo");
                objeto.saldo = nuevoMontoTotalDepositado;
                console.log("el nuevo saldo total es " + objeto.saldo);
            } 
            else {
                console.log("Contraseña incorrecta");
            }
        }
        else{
            console.log("Usuario incorrecto");
        }
    });
}

function consultarGo() {
    let divError = document.getElementById('idConsulta_de_aviso');
    let HTMLString = `Su saldo Actual es: `+ nuevoMontoTotalDepositado;
    divError.innerHTML = HTMLString;
    console.log(HTMLString);
}


function retirarGo() {
    var montoRetiro = Number(document.getElementById("cantidad_retiro").value);
    
    avisoDepositosRetiros('idRetirar_de_aviso',`(sin ejecutar)`,3);
    

    console.log("El monto del retiro es " + montoRetiro);
    console.log("El monto del saldo anterior es de " + nuevoMontoTotalDepositado);
    var totalxd = nuevoMontoTotalDepositado - montoRetiro;
    console.log("total a comparar" + totalxd);

    if((montoRetiro==0) || (montoRetiro%1)!=0){
        
        avisoDepositosRetiros('idRetirar_de_aviso',`Retiro Fallido (ingresa un numero entero y mayor a cero)`,false);
        cantidad_retiro.value ="";
    }
    else if ((montoRetiro>nuevoMontoTotalDepositado) || (montoRetiro>980) || (montoRetiro==nuevoMontoTotalDepositado)) {
        if ((montoRetiro>nuevoMontoTotalDepositado) && (montoRetiro>980)) {
            avisoDepositosRetiros('idRetirar_de_aviso',`Retiro Fallido (su saldo minimo debe ser de 10)`,false);
            cantidad_retiro.value ="";
        } 
        else if ((montoRetiro>nuevoMontoTotalDepositado) && (montoRetiro<980)) {
            avisoDepositosRetiros('idRetirar_de_aviso',`Retiro Fallido (no tiene el saldo suficiente)`,false);
            cantidad_retiro.value ="";
        } 
        else {
            avisoDepositosRetiros('idRetirar_de_aviso',`Retiro Fallido (no puede retirar todo su dinero)`,false);
            cantidad_retiro.value ="";
        }
    } 
    else if(totalxd>=10)
    {
        if (totalxd==10) {
            avisoDepositosRetiros('idRetirar_de_aviso',`Retiro exitoso (minimo de saldo de 10 alcanzado)`,true);
            nuevoMontoTotalDepositado = totalxd;
            insertarNuevoSaldo();
            cantidad_retiro.value ="";
        }
        else{
            avisoDepositosRetiros('idRetirar_de_aviso',`Retiro exitoso`,true);
            nuevoMontoTotalDepositado = totalxd;
            insertarNuevoSaldo();
            cantidad_retiro.value ="";
        }
    }

}

function salirGo() {
    let HTMLString = `
    <div class="login_center">
      <h1 class="center_horizontal">Bienvenido a tu cajero de BANK.DEVF
      </h1>
      <form class="inputs_center" name="formlogin">
        <h2>Inicie sesion</h2>
        <div class="txt_field">
          <input type="text" id="userName" name="user_name" class="user_name" required>  
          <span></span>
          <label>Username</label>
        </div>
        <div class="txt_field ">
          <input type="password" name="user_password" class="userPassword" id="userPassword" required>
          <span></span>
          <label>Password</label>
        </div>

        <div id="id_login_aviso" class="login-aviso">
          <div id="id_login_aviso2" class="login-aviso2">
          </div>
        </div>
        
        <input type="button" value="Login" onclick="obtenerDatosLogin()">
      </form>
    </div>
    `;
    divMain.innerHTML = HTMLString;
    userNames = "";
    userPassword = "";
    nuevoMontoTotalDepositado=0;

}
