import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsServices } from './prducts.services';
import { Product } from './product';
// Decorator
@Component({
  // le champs selector est uniquement utile so le component 
  // est à utiliser à l'interieur d'html, si on root sur ce component 
  // pas besoin de ce champs
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],

  // pour declarer un service uniquement pour ce component et aussi ces nested component,
  // il faut indiquer le nom de la classe service dans le champs providers
  // ex avec la class ProductsServices :
  // providers:[ProductsServices]
})
// Classe
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  isShown: boolean = false;

  private _listFilter: string = '';

  products: Product[] = [];
  // variable servant au filtre
  filteredProducts: Product[] = [];

  errorMessage: string = '';

  // Variable pour unsubscribe à l'obeservable
  sub!: Subscription;

  /**
   * constructor
   * la syntaxe permet de creer une variable privée du nom du service voulu
   */
  constructor(private productService: ProductsServices) {}

  /**
   * Getter and setter
   */

  public get listFilter(): string {
    return this._listFilter;
  }

  public set listFilter(v: string) {
    this._listFilter = v;
    this.filteredProducts = this.performFilter(this.listFilter);
  }

  /**
   * toggleImage
   */
  public toggleImage(): void {
    this.isShown = !this.isShown;
  }

  /**
   *   filter products
   */
  private performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleUpperCase();
    return this.products.filter((product: Product) =>
      product.productName.toUpperCase().includes(filterBy)
    );
  }

  ngOnInit(): void {
    // en faisant le subscribe on appelle de manière asynchrone le client http
    // il faut par conséquent dire quoi faire en fonction du résultat
    // 3 type de fonction possible pour 3 cas différent :
    // fonction next : definit quoi faire de l'obervable qui vient de passer (pour du http il n'y a qu'un next)
    // fonction error : que faire en cas d'erreur
    // fonction complete : qui dit quoi faire quand c'est terminé
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
        this.listFilter = '';
      },
      error: (err) => (this.errorMessage = err),
    });

    //si on utilise la variable products ici, elle n'aura pas encore récupéré les valeurs
    // par conséquent c'est comme si la liste etait vide
    // c'est pour cela qu'on a mis cette instruction dans le block next
    // this.listFilter = '';
  }


  /**
   * Ici on unsubscribe pour eviter de faire des leaks de memoire
   * car si on quitte puis on revient sur ce component on aura 2 souscriptions 
   * au meme observable (la souscription de la premiere fois + la nouvelle instanciation
   * de la souscription)
   * 
   * lien explicatif https://blog.angular-university.io/angular-2-rxjs-common-pitfalls/
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(event: string): void {
    this.pageTitle = 'Product List :' + event;
  }
}
