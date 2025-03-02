import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
const NoProductAvailable = ({value,className}:{value:string,className?:string}) => {
  return (
    <div className={cn("flex flex-col gap-4 items-center justify-center py-10 min-h-80 space-y-4 text-center bg-amazonBlue/10 rounded-lg w-full",className)}>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
        <h2 className='text-2xl font-bold text-gray-800'>No Products Available</h2>
      </motion.div>
      <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}}>
        We&apos;re sorry, but there are no products matching {''}.
        <span className='text-base font-semibold text-darkColor capitalize'>{value}</span>{''} criteria at the moment.
      </motion.p>
      <motion.div animate={{scale:[1,1.1,1]}}
      transition={{
        duration:0.5,
        repeat:Infinity,
        repeatType:'loop'
      }}
      className='items-center justify-center flex space-x-2 text-amazonOrangeDark'
      >
        <Loader2 className='w-4 h-4 animate-spin' />{''}  
        <span className='text-sm font-medium'>We&apos;re re-stocking shortly</span>
      </motion.div>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4,duration:0.5}}
      className='text-sm text-gray-600'
      >
        Please check back later or explore other products.
      </motion.p>
    </div>
  )
}

export default NoProductAvailable
