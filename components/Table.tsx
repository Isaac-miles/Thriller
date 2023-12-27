import React from 'react'
import { ProductType,ProductElementType } from '@/app/stripe-util/getStripesUtils'
import { CheckIcon } from '@heroicons/react/20/solid'

interface TableProps {
    products:ProductType
    selectedPlan:ProductElementType
}

function Table({products, selectedPlan}:TableProps) {

  return (
    <table>
        <tbody className='divide-y divide-[grey]'>
            <tr className='tableRow'>
                <td className="tableDataTitle">Monthly Price</td>
                {products?.map((product)=>(
                    <td className={`tableDataFeature ${selectedPlan.priceId=== product.priceId? "text-[#c31432]" :"text-[gray]"}`} key={product.priceId}>₦{product.priceInfo.unit_amount/100}</td>
                ))}
            </tr>
            <tr className='tableRow'>
                <td className="tableDataTitle">Video Quality</td>
                {products?.map((product)=>(
                    <td className={`tableDataFeature ${selectedPlan.priceId=== product.priceId? "text-[#c31432]" :"text-[gray]"}`} key={product.priceId}>{product.metadata.videoQuality }</td>
                ))}
            </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {products.map((product) => (
            <td
            className={`tableDataFeature ${selectedPlan.priceId=== product.priceId? "text-[#c31432]" :"text-[gray]"}`}
              key={product.priceId}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {products.map((product) => (
            <td
            className={`tableDataFeature ${selectedPlan.priceId=== product.priceId? "text-[#c31432]" :"text-[gray]"}`}
              key={product.priceId}
            >
              {product.metadata.flexibility === 'true' && (
                <CheckIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
       
        </tbody>
    </table>
  )
}

export default Table