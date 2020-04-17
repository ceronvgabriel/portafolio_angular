import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: any[] = [];
  productosFiltrado: any[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }


  private cargarProductos(){
    
    return new Promise( ( resolve, reject ) =>{

      this.http.get('https://angular-html-31f01.firebaseio.com/productos_idx.json').subscribe( (resp: any[]) => {
      
        this.productos = resp;

        resolve();
      });

    } );

  }

  public cargarProductosInfo( id: string){
    return this.http.get(`https://angular-html-31f01.firebaseio.com/productos/${ id }.json`);
  }

  public buscarProducto( termino: string){

    if ( this.productos.length === 0){
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      });

    }else{
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos( termino: string ){
    
    this.productosFiltrado = [];
    
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      if( prod.categoria.toLocaleLowerCase().indexOf(termino) >= 0 || prod.titulo.toLocaleLowerCase().indexOf(termino) >=0){
        this.productosFiltrado.push(prod);
      }
    }); 

  }

}
