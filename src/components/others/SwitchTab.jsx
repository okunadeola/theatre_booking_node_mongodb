import { Tab, Tabs } from "@nextui-org/react"
import PropTypes from 'prop-types';


const SwitchTab = ({tabs}) => {
  return (
    <Tabs   aria-label="Tabs radius"  radius={'none'}>
      {
        tabs?.map(tb =>(
          <Tab key={tb.key} title={tb.label} />

        ))
      }
    </Tabs>
  )
}

export default SwitchTab

SwitchTab.propTypes = {
  tabs: PropTypes.array
}