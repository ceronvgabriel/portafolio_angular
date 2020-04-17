import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  productoInfo: any;
  id: string;

  constructor( private route: ActivatedRoute, public productosService: ProductosService) { }

  ngOnInit(): void {

    this.route.params.subscribe( parametros => {

      this.id = parametros['id'];
      
      this.productosService.cargarProductosInfo(parametros['id']).subscribe( productoInfo => {

        this.productoInfo = productoInfo;
  
      });

    });

  }

}
