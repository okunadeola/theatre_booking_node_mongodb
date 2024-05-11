

import  { useState } from 'react';
import { Button, Drawer, Space } from 'antd';


const ExpandedDrawer2 = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

//   const showDefaultDrawer = () => {
//     setSize('default');
//     setOpen(true);
//   };

  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        {/* <Button type="primary" onClick={showDefaultDrawer}>
          Open Default Size (378px)
        </Button> */}
        <Button  onClick={showLargeDrawer}>
          Test drawer
        </Button>
      </Space>
      <Drawer
        title={`${size} Drawer`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button  onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default ExpandedDrawer2;