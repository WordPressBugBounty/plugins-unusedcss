import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import React from "react";
import { cn } from "lib/utils";
import UrlPreview from "app/page-optimizer/components/footer/url-preview";


const ErrorFetch = ({ error, className, icon = true }: { error: string, className?: string, icon?: boolean}) => {
    return <div className={cn(
        'flex flex-col gap-2',
        className
    )}>
        <div className='w-fit'>
            {icon && <ExclamationCircleIcon className='w-8 fill-red-500' />}
        </div>
        <div className="justify-start">
        {icon &&<UrlPreview />}
        </div>
        <div className='flex flex-col gap-1'>
            <span className='font-medium text-md '>Oops! Something went wrong</span>
            <span className='text-sm text-brand-700 dark:text-brand-300'>Refresh the page, If the error persists
                <br />
                please <a target='_blank' className='text-purple-750' href='https://rapidload.zendesk.com/hc/en-us'>contact support</a>
            </span>
            <span 
            className={cn(
                'text-sm text-brand-500 dark:text-brand-200 border-t mt-2 pt-2 mb-6 max-w-[350px]', 
                className   
            )}>
                <span className='font-medium text-brand-800 dark:text-brand-400'>Details:</span> {error}
            </span>
        </div>
    </div>
}

export default ErrorFetch