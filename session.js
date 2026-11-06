import {isAdmin,json} from "../_shared/auth.js";
export async function onRequestGet({request,env}){
 if(!env.ADMIN_PASSWORD)return json({authenticated:false},200);
 return json({authenticated:await isAdmin(request,env.ADMIN_PASSWORD)});
}
