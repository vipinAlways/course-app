import React from 'react'
import CourseCard from '~/components/CourseCard'

const page = () => {
  return (
    <div >
      
      <CourseCard cardData={{
        category:"ds",
        creator:"mee eee",
        description:"dssssssss",
        image:"https://imgs.search.brave.com/CqYd0Sa4ritZQkWrX4njLZ_CgtrZu87qjPrDmvP4WzQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9maXZl/cnItcmVzLmNsb3Vk/aW5hcnkuY29tL2lt/YWdlcy90X21haW4x/LHFfYXV0byxmX2F1/dG8scV9hdXRvLGZf/YXV0by9naWdzLzMy/MzQwNDEyNS9vcmln/aW5hbC85MjQzZjU0/ZDIzNWU5NzlkYjI0/ZGFmYzQwODBjNTFh/MWM2MzgyNWMzL2Rl/c2lnbi1vbmxpbmUt/Y291cnNlLXRodW1i/bmFpbC11ZGVteS1j/b3Vyc2UtY292ZXIt/aW1hZ2UucG5n",
        price:300,
        title:"start today"

      }}/>
    </div>
  )
}

export default page
