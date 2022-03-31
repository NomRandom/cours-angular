import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Product } from './product';

@Injectable({
  // en indiquant ce provideIn a root, la classe service est disponible partout
  providedIn: 'root',
})
export class ProductsServices {
  private _url: string = 'api/products.json';

  /**
   * Constructeur
   *
   */
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this._url).pipe(
      // tap permet de voir le resultat de la requete sans modiifcation ou d'instanciation, utile poru debuger
      tap((data) => console.log('ALL', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured ${err.error.message}`;
    } else {
      errorMessage = `Server returned code : ${err.status}, error message is : ${err.message}`;
    }

    console.log(errorMessage);
    return throwError(()=> new Error(errorMessage));
  }
}
