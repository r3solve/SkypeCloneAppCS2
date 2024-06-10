import * as React from 'react';
import { FAB, Portal, Provider as PaperProvider } from 'react-native-paper';
import Color from '../../constants/Color';
import { Alert } from 'react-native';

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
          icon={open ? 'close' : 'phone'}
          style={{backgroundColor:'#EDF7FF'}}
          actions={[
            {
              icon: 'video',
              label: 'Video Call',
              onPress: () => Alert.alert('Pressed Video'),
              style: { backgroundColor: Color.primary_color }, // Customize the background color of each action

            },
            {
              icon:'phone',
              label: 'Voice Call',
              onPress: () => Alert.alert('Pressed Voice'),
              style: { backgroundColor: Color.primary_color }, // Customize the background color of each action

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
