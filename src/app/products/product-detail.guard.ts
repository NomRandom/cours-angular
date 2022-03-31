import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  /**
   * Classe interceptor autorisant ou non le rooting sur le
   * component porduct detail (cf app.module)
   * 
   * Le controle fait ici est juste de verifier que le param renseigné
   * est un id au bon format
   * 
   * @param router 
   */
  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id = Number(route.paramMap.get('id'));
      if(isNaN(id) || id<1){
        alert('Invalid product id');
        this.router.navigate(['/products']);
        return false;
      }
    
      return true;
  }
  
}
