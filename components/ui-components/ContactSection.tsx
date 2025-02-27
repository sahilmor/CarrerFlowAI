import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'

const ContactSection = () => {
    return (
        <div className='flex gap-4 items-center justify-center mx-auto p-5'>
            <div className='space-y-4 border p-5 rounded-md'>
                <div>
                    <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-full' width="200" height="200" />
                </div>
                <div className='text-center space-y-2'>
                    <h1 className='text-4xl font-bold'>Sahil Mor</h1>
                    <h3>MERN Developer</h3>
                </div>
                <div className='flex gap-4 justify-center items-center mx-auto px-4'>
                    <Mail />
                    <Github />
                    <Linkedin />
                </div>
            </div>
            
            <div className='space-y-4 border p-5 rounded-md'>
                <div>
                    <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-full' width="200" height="200" />
                </div>
                <div className='text-center space-y-2'>
                    <h1 className='text-4xl font-bold'>Nitish</h1>
                    <h3>MERN Developer</h3>
                </div>
                <div className='flex gap-4 justify-center items-center mx-auto px-4'>
                    <Mail />
                    <Github />
                    <Linkedin />
                </div>
            </div>
            
            <div className='space-y-4 border p-5 rounded-md'>
                <div>
                    <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-full' width="200" height="200" />
                </div>
                <div className='text-center space-y-2'>
                    <h1 className='text-4xl font-bold'>Harsh</h1>
                    <h3>MERN Developer</h3>
                </div>
                <div className='flex gap-4 justify-center items-center mx-auto px-4'>
                    <Mail />
                    <Github />
                    <Linkedin />
                </div>
            </div>
            
        </div>
    )
}

export default ContactSection