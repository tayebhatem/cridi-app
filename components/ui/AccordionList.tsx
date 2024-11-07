import { View, Text } from 'react-native'
import React from 'react'
import { ChevronDown } from '@tamagui/lucide-icons'
import { Accordion, Paragraph, Square } from 'tamagui'
import { FAQType } from '@/types'

const AccordionList = ({list}:{list:FAQType[]}) => {
  return (
    <Accordion overflow="hidden"   type="multiple"  >
    {
        list.map((item)=>(
            <Accordion.Item value={item.id} key={item.id} >
      <Accordion.Trigger flexDirection="row" justifyContent="space-between">
        {({
          open,
        }: {
          open: boolean
        }) => (
          <>
            <Paragraph className='text-base font-kufi-medium leading-7 text-black dark:text-white'>{item.question}</Paragraph>
            <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
              <ChevronDown size="$1" />
            </Square>
          </>
        )}
      </Accordion.Trigger>
      <Accordion.HeightAnimator animation="lazy">
        <Accordion.Content animation="lazy" exitStyle={{ opacity: 0 }}>
          <Paragraph className='text-neutral-500 font-kufi' >
        {item.answer}
          </Paragraph>
        </Accordion.Content>
      </Accordion.HeightAnimator>
    </Accordion.Item>
        ))
    }

   
  </Accordion>
)
  
}

export default AccordionList