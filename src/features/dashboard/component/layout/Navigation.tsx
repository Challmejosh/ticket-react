import { LayoutDashboard, LogOut, Menu, Ticket, TicketPlus, X } from "lucide-react";
import { useContext, useState, type ReactNode } from "react";
import AppName from "../../../../components/ui/AppName";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../../../Context/AppContext";

const Navigation = () => {
    const { logOut,user } = useContext(AppContext)
    const nav:{text:string,href:string,icon: ReactNode}[] = [
        {
            text: 'dashboard',
            href: '/dashboard',
            icon: <LayoutDashboard size={20} />
        },
        {
            text: 'tickets',
            href: '/tickets',
            icon: <Ticket size={20} />
        },
        {
            text: 'create ticket',
            href: '/create-ticket',
            icon: <TicketPlus size={20} />
        },
    ]
    const otherLinks: {text:string,click:()=>void,href: string,icon:ReactNode }[] =[
        {
            text: 'logout',
            click: logOut,
            href: '/signin',
            icon: <LogOut size={20} />
        }

    ]
    const pathname = useLocation().pathname
    const [slide,setSlide] = useState<boolean>(false)
    const first = user?.name.split(' ')[0].charAt(0) as string
    const second = user?.name.split(' ')[1].charAt(0) as string
    const userAbbr =  first + second
    return ( 
        <div className=" 
        sticky top-0 lg:static z-50 shadow-lg lg:shadow-none
        w-full lg:w-[300px] h-20 lg:h-screen p-3 
        lg:border-r lg:border-r-slate-100 bg-white flex lg:flex-col 
        gap-6 lg:items-start lg:justify-start items-center justify-between
        ">
            <AppName />
            {/* for desktop nav */}
            <div className={` w-full h-full hidden lg:flex flex-col gap-3 items-start justify-between `}>
                <div className="w-full flex flex-col gap-3 items-start justify-center ">
                    {nav.map((item,index)=>(
                        <Link 
                        to={item.href} 
                        key={index} 
                        className={`
                            flex gap-2 items-center justify-start w-full rounded-lg
                            p-2 capitalize font-semibold hover:bg-[#3b82f6]/20
                            hover:text-[#3b82f6]
                            ${pathname.includes(item.href)?"bg-[#3b82f6]/20 text-[#3b82f6] ":""}
                            `}
                        >
                            {item.icon}
                            <p className="text-sm">
                                {item.text}
                            </p>
                        </Link>
                    ))}
                </div>
                {/* logout */}
                <div className="w-full flex flex-col gap-3 items-start justify-center ">
                    {otherLinks.map((item,index)=>(
                        <div 
                        onClick={item.click}
                        key={index} 
                        className={`
                            flex gap-2 items-center justify-start w-full rounded-lg
                            p-2 capitalize font-semibold hover:bg-[#3b82f6]/20
                            hover:text-[#3b82f6] cursor-pointer
                            
                            `}
                        >
                            {item.icon}
                            <p className="text-sm">
                                {item.text}
                            </p>
                        </div>
                    ))}
                    <div className="border-t cursor-pointer border-t-slate-400 p-2 w-full flex gap-2 items-center justify-start">
                        <div 
                        className="
                        w-[50px] h-[50px] bg-[#f8fafc] flex items-center justify-center 
                        font-bold text-center rounded-full uppercase text-[#3b82f6]
                         "
                        children={userAbbr} 
                        />
                        <div className="text-xs">
                            <p className="font-semibold capitalize text-sm ">
                                {user?.name}
                            </p>
                            <p className="lowercase">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            {/* menu option for mobile */}
            <div onClick={()=>setSlide(true)} 
            className=" lg:hidden flex items-center justify-center 
            text-center rounded-lg h-10 w-10 shadow-md bg-white cursor-pointer 
            
            ">
                <Menu size={20} />
            </div>

            {/* for mobile nav */}
            <div 
            className={`
                ${slide?
                "translate-x-0"
                :
                "translate-x-full"
                } 
                z-50
                duration-300 tranform transition-all bg-black/20 backdrop-blur h-screen fixed inset-0 
                w-full flex items-start justify-between lg:hidden
                `}>
                    <div className="flex items-center justify-start p-3 ">
                        <div onClick={()=>setSlide(false)} className=" lg:hidden flex items-center justify-center text-center rounded-lg h-10 w-10 shaodw-md bg-white cursor-pointer ">
                            <X size={20} />
                        </div>
                    </div>

                    <div className={` 
                    duration-300 tranform transition-all
                    w-[60%] bg-white p-3 h-full flex flex-col gap-3 items-start justify-between `}>
                        <div className="w-full pt-8 flex flex-col gap-3 items-start justify-center ">
                            {/* <AppName /> */}
                            {nav.map((item,index)=>(
                                <Link 
                                to={item.href} 
                                key={index} 
                                className={`
                                    flex gap-2 items-center justify-start w-full rounded-lg
                                    p-2 capitalize font-semibold hover:bg-[#3b82f6]/20
                                    hover:text-[#3b82f6]
                                    ${pathname.includes(item.href)?"bg-[#3b82f6]/20 text-[#3b82f6] ":""}
                                    `}
                                >
                                    {item.icon}
                                    <p className="text-sm">
                                        {item.text}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        {/* logout */}
                        <div className="w-full flex flex-col gap-3 items-start justify-center ">
                            {otherLinks.map((item,index)=>(
                                <div 
                                onClick={item.click}
                                key={index} 
                                className={`
                                    flex gap-2 items-center justify-start w-full rounded-lg
                                    p-2 capitalize font-semibold hover:bg-[#3b82f6]/20
                                    hover:text-[#3b82f6] cursor-pointer
                                    
                                    `}
                                >
                                    {item.icon}
                                    <p className="text-sm">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                            <div className="border-t cursor-pointer border-t-slate-400 p-2 w-full flex gap-2 items-center justify-start">
                                <div 
                                className="
                                w-[50px] h-[50px] bg-[#f8fafc] flex items-center justify-center 
                                font-bold text-center rounded-full uppercase text-[#3b82f6]
                                "
                                children={userAbbr} 
                                />
                                <div className="text-xs">
                                    <p className="font-semibold capitalize text-sm ">
                                        {user?.name}
                                    </p>
                                    <p className="lowercase">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
            </div>
        </div>
     );
}
 
export default Navigation;