import { Hind_Guntur, Poppins} from 'next/font/google'
 
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins',
})
 
export const hind_guntur = Hind_Guntur({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700',],
  style: ['normal'],
  display: 'swap',
  variable: '--font-hind_guntur',
})