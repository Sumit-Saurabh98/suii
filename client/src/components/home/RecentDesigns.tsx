import React from 'react'

const RecentDesigns = () => {
    const designs = Array(6).fill(null).map((_, i) => ({
        id: i,
        title: `Design ${i + 1}`,
        imageUrl: `https://via.placeholder.com/150?text=Design+${i + 1}`,
    }))
  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Recent Designs</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {
            designs.map((design) => (
                <div key={design.id} className="group cursor-pointer">
                    <div className='aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-shadow duration-200 ease-in-out group-hover:shadow-lg'>
                        <p className='font-bold text-sm truncate'>{design.title}</p>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default RecentDesigns
