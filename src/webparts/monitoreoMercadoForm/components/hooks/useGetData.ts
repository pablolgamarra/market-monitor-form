import {useState, useEffect} from 'react'

const [loading,setLoading] = useState<boolean>(false)

const useQuerySP = useEffect(()=>{
    setLoading(true)
},)