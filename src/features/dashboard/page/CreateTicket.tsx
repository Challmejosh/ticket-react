import { useContext, useState, type FormEvent } from "react";
import DashboardLayout from "../component/layout/DashboardLayout";
import Form from "../component/ui/Form";
import { AppContext } from "../../../Context/AppContext";
import type { TicketType } from "../../../util/types";
import { useNavigate } from "react-router-dom";
import Input from "../component/ui/Input";
import TextArea from "../component/ui/TextArea";
import Select from "../component/ui/Select";
import useCreate, { type CreateTicketType } from "../hook/useCreate";

const CreateTicket = () => {
    const { ticketCreation,isPending } = useCreate()
    const initialValues : TicketType = {
        title:"",
        desc:"",
        priority: "none",
        status: "open",
    }
    const { user } = useContext(AppContext)
    const [form,setForm] = useState<TicketType>(initialValues)
    const [error,setError] = useState<boolean>(false)
    const navigate = useNavigate()
    const handleCreate = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(
            !form.title||
            !form.status||
            (form.desc.trim()&&form.desc.length<10)||
            form.title.length<=5
        ){
            setError(true)
            return
        }
        setError(false)
        const ticketData: CreateTicketType = {
            title:form.title,
            desc:form.desc,
            status:form.status,
            priority:form.priority,
            id: user?.id as string,
        }
        await ticketCreation(ticketData,{
            onSuccess:()=>{
                setForm(initialValues)
            },
            onSettled:()=>{
                setError(false)
            }
       })
    }
    return ( 
        <DashboardLayout>
            <div className="p-6 w-full max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                    <h1 className="text-2xl font-bold mb-2">Create New Ticket</h1>
                    <p className="text-sm text-gray-500 mb-6">Fill out the form below to submit a new ticket.</p>
                        <Form
                        loading={isPending}
                        submit={handleCreate}
                        buttonText="Create Ticket"
                        extraBtnText="Cancel"
                        extraFn={()=>navigate(-1)}
                        >
                        <Input
                        id="title"
                        label="Title"
                        value={form.title}
                        onChange={(e)=>setForm({...form,title:e.target.value})}
                        error={error&&(!form.title||form.title.length<=5)}
                        errorMessage={!form.title?"Title is required":"Title must be greater than 5 characters"}
                        />
                        <TextArea 
                        id="desc"
                        label="Description"
                        value={form.desc}
                        onChange={(e)=>setForm({...form,desc:e.target.value})}
                        error={error&&!!(form.desc.trim()&&form.desc.length<10)}
                        errorMessage="Description must be at least 10 characters"
                        />
                        <div className="flex gap-4 items-center justify-between w-full ">
                            <Select 
                            value={form.status}
                            data={["open","in_progress","closed"]}
                            label="Status"
                            onChange={(e)=>setForm({...form,status:e.target.value as "open"|"closed"|"in_progress"})}
                            id="status"
                            error={error&&!form.status}
                            errorMessage="Status is required"
                            />
                            <Select 
                            value={form.priority}
                            data={["none","low","medium","high"]}
                            label="Priority"
                            onChange={(e)=>setForm({...form,priority:e.target.value as "low"|"medium"|"high"|"none"})}
                            id="priority"
                            />
                        </div>
                        </Form>
                </div>
            </div>
        </DashboardLayout>
     );
}
 
export default CreateTicket;