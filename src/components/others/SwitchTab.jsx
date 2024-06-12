import { Tab, Tabs } from "@nextui-org/react"
import PropTypes from 'prop-types';



const SwitchTab = ({tabs, selected,  setSelected}) => {

  return (
    <Tabs 
      selectedKey={selected}
      onSelectionChange={setSelected}
      aria-label="Tabs radius"  radius={'none'}>
      {
        tabs?.map((tb) =>(
          <Tab  key={tb.Key} title={tb.label} />
        ))
      }
    </Tabs>
  )
}

export default SwitchTab

SwitchTab.propTypes = {
  tabs: PropTypes.array,
  selected: PropTypes.string,
  setSelected: PropTypes.any
}