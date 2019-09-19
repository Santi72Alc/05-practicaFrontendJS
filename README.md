Santiago San Román Játiva  
Alicante (*Sept. 2019*)

# <center>BEER NOW
### <center>Práctica frontend con JS avanzado
---
## <center>Práctica sobre Beer's API

La práctica se basa en la consulta, visualización y comentarios sobre la BD de la api de cervezas "https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/beers".
Permite al usuario ver las 10 primeras cervezas de la BD o hacer una determinada búsqueda por texto y/o fecha de primera elaboración de las mismas.

### **INSTALACIÓN**  
<u>***Pre-requisitos***</u>  
Necesitaremos tener 'git' y 'npm' instalados en nuestro ordenador para poder descargar e instalar las dependecias necesarias para el uso de la  aplicación.

- *En linux (UBUNTU)*
~~~
sudo apt install NPM
~~~

<u>***Descarga***</u>  
~~~
git clone https://github.com/Santi72Alc/practicaFrontendJSAvanzado.git directorio_instalación
~~~
<u>***Instalación de librerías necesarias***</u>  
~~~
cd directorio_instalación
npm install
~~~

<u>***Ejecución del servidor local***</u>  
~~~
npm run server
~~~
Como salida de esta ejecución obtenemos las direcciones de trabajo de la aplicación.


### **EJECUCIÓN**  
En el navegador accederemos a una de las direcciones indicadas como salida en la ejecución de nuestro servidor local.  
NOTA: Pulsando <`ctrl`>+<`click izquiero ratón`> sobre la dirección deseada se accede directamente a la misma.  

### **DESCRIPCIÓN Y USO DE LA APLICACIÓN**  
La página es adaptativa, es decir, dependiendo del tamaño del soporte donde se visualice la aplicación se verá ajustando algunas visualizaciones.  
Nos permite la visualización (con búsqueda y/o filtrado) de las cervezas contenidas en la BD de la API así como la introducción de comentarios sobre cada una de ellas.

**Pantalla principal**  

- En pantallas pequeñas:  
En la parte superior(por fecha) -*se explica más adelante*-.  
En la parte central de la pantalla nos presenta una lista de elementos que representan las 10 primeras cervezas cargadas de la BD o las resultantes de la búsqueda o filtrado.  
Al presionar cualquiera de ellos, nos permite visualizar una foto y una pequeña descripción de la seleccionada.

- En pantallas medianas y grandes:  
En la parte superior podemos ver los campos de búsqueda y filtrado de fecha -*se explica más adelante*-.  
En la parte central de la pantalla se nos presentará la fotografía de las 10 primeras cervezas obtenidas de la BD o, en su caso, las obtenidas en la búsqueda o filtrado.  
Al pasar el ratón por encima de cualquiera de ellas no presentará su código, nombre y una breve descripción de la indicada.  

**Búsqueda y Filtrado**  

En el uso de la app, introduciendo dato en el campo '*search*' tenemos la posibilidad de hacer una búsqueda en el nombre o descripción de la cerveza, así como en el campo '*fecha*' introducir una fecha que nos filtrará por el MES y AÑO de primera elaboración.  

Si el campo '*search*' está en blanco, la filtración se realiza sobre <u>TODA</u> la BD de cervezas, si por el contrario hemos realizado una búsqueda, el filtrado de fecha se hará <u>SÓLO</u> por las buscadas.  

El campo '*Guardar búsqueda*' nos permite que, en el caso de que se marque la casilla, sea guardada la búsqueda para la próxima vez que entremos en al aplicación.  
Los datos de búsqueda y filtrado se recuperarán si ha habido alguna grabación anterior.  

NOTA: Para borrar la grabación de filtro se debe hacer una búsqueda con TODOS los campos '*search*' y '*fecha*' en blanco y la casilla de '*Guardar búsqueda*' marcada.  


**Pantalla de detalle**  

En la pantalla de detalle, lo que se obtiene es una información mas detallada sobre la cerveza seleccionada.   

En la parte inferior de esta pantalla de detalles se visualizarán los posibles comentarios y fecha de los mismos que se vayan realizando sobre la cerveza.

Al introducir un mensaje, se añadirá éste a dicha cerveza así como la fecha y hora que se realiza el comentario.  

---
Santiago San Román Játiva  
Alicante (*Sept. 2019*)
