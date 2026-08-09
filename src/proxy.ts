import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constans/roles";

export async function proxy(request: NextRequest){
    const pathName = request.nextUrl.pathname;
    let isAuthenticated = false;
    let isAdmin = false;
const {data}= await userService.getSession();
if(data){
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
}

// user in not authenticated at all
if(!isAuthenticated){
    return NextResponse.redirect(new URL("/login", request.url))
}
// user is authenticated and role = ADMIN
// ADMIN can not visit USER dashboard
if(isAdmin && pathName.startsWith("/dashboard")){
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
}
// user is authenticated and role = USER
// USER can not visit ADMIN dashboard
if(!isAdmin && pathName.startsWith("/admin-dashboard")){
    return NextResponse.redirect(new URL("/dashboard", request.url));
}
return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard","/dashboard/:path*", 
        "/admin-dashboard", "/admin-dashboard/:path*"],
}