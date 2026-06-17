import { motion } from 'framer-motion'
import type { Notice } from '../integrations/tanstack-query/root-provider'

export default function Notice({ notice }: { notice: Notice }) {
  return (
    <motion.div 
      className="fixed top-20 left-10 right-10 bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded mb-4 z-10 transition-opacity duration-300"
      exit={{ opacity: 0, scale: 0 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h2 className="text-lg font-bold mb-2">{notice.title}</h2>
      <p>
        {notice.message}
      </p>
    </motion.div>
  )
}