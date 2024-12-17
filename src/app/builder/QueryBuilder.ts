import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
public modelQuery:Query<T[],T>;
public query:Record<string,unknown>
constructor ( modelQuery:Query<T[],T>,query:Record<string,unknown>){
this.modelQuery =modelQuery;
this.query=query
}
search(searchableField:string[]){
    if(this?.query?.searchTerm){
     this.modelQuery =this.modelQuery.find({
    $or:searchableField.map((field)=>({
      [field]:{$regex:searchTerm,$options:'i'}
    }) as FilterQuery<T>)
  })
}
return this;
}
filter(){
      const objQuery = {...this.query}
      const excludeField = ['searchTerm','sort','fields','page','skip','limit']
      excludeField.forEach((el)=>delete objQuery[el])
      this.modelQuery = this.modelQuery.find(objQuery as FilterQuery<T>)
 return this;
}

}