import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCompanies } from '@/redux/companySlice'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'

function CompaniesTable() {
  const {companies,searchCompanyByText} = useSelector(store=> store.company);
  const [filterCompanies,setFilterCompanies] = useState(companies);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteCompanyHandler = async (id) => {
    try {
      const res = await axios.delete(`${COMPANY_API_ENDPOINT}/delete/${id}`, { withCredentials: true });
      if (res.data.success) {
        const updatedCompanies = companies.filter((company) => company._id !== id);
        dispatch(setCompanies(updatedCompanies));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
  const isSubsequence = (text, target) => {
    let i = 0, j = 0;
    while (i < text.length && j < target.length) {
      if (text[i] === target[j]) {
        j++;
      }
      i++;
    }
    return j === target.length;
  };

  const filteredCompanies = (companies || []).filter((company) => {
  if (!searchCompanyByText) return true;
  return isSubsequence(
    company?.name?.toLowerCase() || '',
    searchCompanyByText.toLowerCase()
  );
});

  setFilterCompanies(filteredCompanies);
}, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of companies registered on the platform.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterCompanies.length <= 0 ? (<span>No Companies</span>) :(
                filterCompanies?.map((company)=>{
                  return <TableRow>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={company.logo} alt="Company Logo" />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className='w-32'>
                          <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                            <Edit2 className='w-4'/>
                            <span>Edit</span>
                          </div>
                          <div onClick={() => deleteCompanyHandler(company._id)} className='flex items-center gap-2 w-fit cursor-pointer mt-2'>
                            <Trash2 className='w-4'/>
                            <span>Delete</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                })
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
