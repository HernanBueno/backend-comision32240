// ->Registrador de tickets de eventos
// Definir clase TicketManager, el cual tendrá un arreglo de eventos que iniciará vacío
// La clase debe contar con una variable privada “precioBaseDeGanancia”, 
//la cual añadirá un costo adicional al precio de cada evento.
// Debe contar con el método “getEventos” El cual mostrará los eventos guardados.
// Debe contar con el método “agregarEvento” El cual recibirá los siguientes parámetros:
// nombre
// lugar
// precio (deberá agregarse un 0.15 del valor original)
// capacidad (50 por defecto)
// fecha (hoy por defecto)
// El método deberá crear además el campo id autoincrementable y el campo “participantes” que siempre iniciará con un arreglo vacío.


// Debe contar con un método “agregarUsuario” El cual recibirá:
// ->id del evento (debe existir, agregar validaciones)
// ->id del usuario

// El método debe evaluar que el evento exista y que el usuario no haya estado registrado previamente 
//(validación de fecha y capacidad se evitará para no alargar el reto)
// Si todo está en orden, debe agregar el id del usuario en el arreglo “participantes” de ese evento.
// Debe contar con un método “ponerEventoEnGira” El cual recibirá:
// id del evento
// nueva localidad
// nueva fecha
// El método debe copiar el evento existente, con una nueva localidad, nueva fecha, nuevo id y sus participantes vacíos (Usar spread operator para el resto de las propiedades)

class TicketManager  {
    #precioBaseDeGanancia = 0.15
    
    constructor(){
        this.eventos = []
        
    }
    //metodo que solo crea un id
    createId(){
        if(this.eventos.length === 0){
            return 1
        }else{
            return this.eventos.length + 1
        }
        
    }
    //metodo para obtener eventos
    getEventos(){
        //verifico que existan eventos, en caso de no existir devuelve "No hay eventos agregados aun"
        if (this.eventos.length === 0) {
            return "No hay eventos agregados aun"
        }else{
            //en caso que existan devuelve el array de eventos
            return this.eventos
        }
    }
    //metodo para agregar eventos
    agregarEvento(nombre, lugar, precio, capacidad, fecha){
        //primero verifico que vengan los datos solicitados obligatorios
        let capacidadDefault = 50;
        let fechaDefault = new Date()
        if(!nombre || !lugar || !precio){
            return "Faltan datos"
        }
        if(capacidad){
            capacidadDefault = capacidad
        }
        if(fecha){
            fechaDefault = new Date(fecha)
        }
        //agrego el evento al array de eventos
        this.eventos.push({
            id : this.createId(),
            participantes : [],
            nombre: nombre,
            lugar: lugar,
            precio: precio + this.#precioBaseDeGanancia,
            capacidad:capacidadDefault,
            fecha:fechaDefault
        })
        return "se agrego evento con exito"
    }
    //metodo para agregar usuarios
    agregarUsuario(eventId, userId){
        let index
        if(this.checkEvent(eventId)){
            index = this.returnIndex(eventId)
            console.log(!this.checkUser(this.eventos[index], userId))
            if(!this.checkUser(this.eventos[index], userId)){
                this.eventos[index].participantes.push({userId:userId})
                return "Se agrego participante"
            }
        
        }else{
            return "No existe el evento o ya existe el usuario"
        }
    }
    //metodo para agregar fechas 
    ponerEventoEnGira(eventId, nuevaLocalidad, nuevaFecha){
        let evento
        //chequeo que se envien datos requeridos
        if(!eventId || !nuevaLocalidad || !nuevaFecha){return "Faltan datos"}
        //verifico que exista evento
        if(this.checkEvent(eventId)){
            evento = this.eventos[this.returnIndex(eventId)]
            evento = {...evento, 
                id:this.createId(),
                localidad:nuevaLocalidad,
                fecha:new Date(nuevaFecha) }
        }
        this.eventos.push(evento)
        return "Se agrego fecha de evento"
    }
    //metodo que devuelve el index en donde esta el evento que voy a modificar
    returnIndex(eventId) {
        return this.eventos.findIndex(e => e.id == eventId)
    }

    //metodo que verifica existencia de evento devuelve true o false
    checkEvent(eventId){return this.eventos.some(evento => evento.id == eventId)}
    //metodo que verifica existencia de usuario devuelve true o false
   checkUser(evento, userId){ return evento.participantes.some(participante=> participante.userId == userId)}
}


const ticketManager = new TicketManager()


console.log(ticketManager.getEventos())
console.log(ticketManager.agregarEvento("Hernan", "Buenos Aires", 1000))
console.log(ticketManager.agregarUsuario(3, 2))
console.log(ticketManager.agregarUsuario(1, 2))
console.log(ticketManager.ponerEventoEnGira(1, "Ushuaia", "5/12/2022"))
console.log(ticketManager.getEventos())
console.log(ticketManager.getEventos()[0])