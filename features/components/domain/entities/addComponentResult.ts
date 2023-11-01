import Component from "./component";

class AddComponentResult {
   component?: Component;
   error?: boolean;
   message: string;
   errors?: {
      error: string,
      field: string
   }[] | null;

   constructor(
      message: string,
      component: Component,
   ){
      this.message = message;
      this.component = component;
   }
}
export default AddComponentResult;