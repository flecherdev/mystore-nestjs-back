import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private pokemon;
  private config: AxiosRequestConfig = {};
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'lorem lorem',
      price: 10000,
      stock: 300,
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];

  constructor(private readonly http: HttpService) {}

  getPokemon(): Promise<AxiosResponse<any>> {
    return this.http.axiosRef
      .get('https://pokeapi.co/api/v2/pokemon/1/')
      .then((data) => data.data)
      .catch((err) => {
        throw new Error(
          err?.message + ': ' + JSON.stringify(err?.response?.data),
        );
      });
  }

  getPokemonObserver(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/1/');
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, changes: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
