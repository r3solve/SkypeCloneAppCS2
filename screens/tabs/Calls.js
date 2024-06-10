import * as React from 'react';
import { FAB, Portal, Provider as PaperProvider } from 'react-native-paper';
import Color from '../../constants/Color';

const CallsPage = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <PaperProvider>
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            {
              icon: 'phone',
              label: 'Voice Call',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon:'phone',
              label: 'Video Call',
              onPress: () => console.log('Pressed notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
          fabStyle={{ backgroundColor: Color.primary_color}} // Customize the background color of the main FAB

        />

      </Portal>
    </PaperProvider>
  );
};

export default CallsPage;
