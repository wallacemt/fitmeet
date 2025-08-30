import {Clock} from 'phosphor-react-native';
import {
  ActivityResponse,
  Participant,
  UserSubscriptionStatus,
} from '../../types/ActivityData';
import {UserResponse} from '../../types/UserTypes';
import {Button} from '../Button';
import {styles} from './style';
import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Input} from '../Input';

interface ButtonsProps {
  onClickFunc?: () => Promise<void>;
  loading?: boolean;
  activity?: ActivityResponse;
  status?: UserSubscriptionStatus;
  checkInFunc?: (code: string) => void;
  acStatus?: string;
  reset?: () => void;
}

const ParticipationButton = ({onClickFunc, loading}: ButtonsProps) => {
  return (
    onClickFunc && (
      <Button.Root
        onPress={async () => await onClickFunc()}
        style={styles.button}
        disabled={loading}>
        <Button.Label>Participar</Button.Label>
      </Button.Root>
    )
  );
};

const ParticipationStatusButton = ({status}: ButtonsProps) => {
  return (
    <Button.Root
      style={styles.button}
      disabled
      type={
        status === UserSubscriptionStatus.PENDING ? 'default' : 'desctructive'
      }>
      <Button.Label>
        {status === UserSubscriptionStatus.PENDING
          ? 'Aguardando aprovação...'
          : 'Inscrição Negada'}
      </Button.Label>
    </Button.Root>
  );
};

const CancelParticipationButton = ({onClickFunc, loading}: ButtonsProps) => {
  return (
    onClickFunc && (
      <Button.Root
        onPress={() => onClickFunc()}
        type="desctructive"
        disabled={loading}
        style={styles.button}>
        <Button.Label type="desctructive">Desinscrever</Button.Label>
      </Button.Root>
    )
  );
};

const AtivityStatusButton = ({acStatus}: ButtonsProps) => {
  return (
    <Button.Root style={styles.button} disabled>
      <Button.Label>
        {acStatus === 'inProgress'
          ? 'Atividade em andamento'
          : 'Atividade encerrada'}
      </Button.Label>
    </Button.Root>
  );
};

const ActivityCountDownButton = ({activity, reset}: ButtonsProps) => {
  if (!activity) return null;
  const countDownDate = new Date(activity.scheduleDate).getTime();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = countDownDate - now;

      if (diff <= 0) {
        setTime('Iniciada');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTime(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTime(`${hours}h ${minutes}m`);
      } else {
        setTime(`${minutes}m`);
        minutes === 0 && reset && reset();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return (
    <Button.Root
      style={[
        styles.button,
        {flexDirection: 'row', alignItems: 'center', gap: 8},
      ]}
      disabled>
      <Clock size={16} />
      <Button.Label>
        {time === 'Iniciada' ? 'Atividade Iniciada' : `Inicia em ${time}`}
      </Button.Label>
    </Button.Root>
  );
};

export const ActivityCheckInButton = ({checkInFunc, loading}: ButtonsProps) => {
  const [code, setCode] = useState('');
  return (
    checkInFunc && (
      <FlatList
        data={[]}
        renderItem={() => <></>}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.form}>
            <Input.Root>
              <Input.Label required>Faça seu Check-in</Input.Label>
              <Input.Input
                placeholder="Código de confirmação"
                value={code}
                onChangeText={text => setCode(text)}
              />
            </Input.Root>
            <Button.Root
              style={styles.button}
              disabled={loading}
              onPress={() => checkInFunc(code)}>
              <Button.Label>Confirmar Presença</Button.Label>
            </Button.Root>
          </View>
        }
      />
    )
  );
};

export const ActivityButtonFactory = ({
  activity,
  participants,
  user,
  onClick,
  loading,
}: {
  activity: ActivityResponse;
  participants: Participant[];
  user: UserResponse | null;
  loading: boolean;
  onClick: {
    subscribeActivity: () => Promise<void>;
    unsubscribeActivity: () => Promise<void>;
    checkInActivity: (code: string) => Promise<void>;
  };
}) => {
  const [activityData, setActivityData] = useState(activity);
  const reset = () => {
    setActivityData(activity);
  };
  const isParticipant = participants.find(
    par => par.userId === user?.id && par.subscriptionStatus === 'accepted',
  );

  const isPending = participants.find(
    par => par.userId === user?.id && par.subscriptionStatus === 'pending',
  );

  const isRecused = participants.find(
    par => par.userId === user?.id && par.subscriptionStatus === 'rejected',
  );

  if (activity?.private && isPending)
    return (
      <ParticipationStatusButton status={UserSubscriptionStatus.PENDING} />
    );

  if (activity?.private && isRecused)
    return (
      <ParticipationStatusButton status={UserSubscriptionStatus.REJECTED} />
    );

  if (
    isParticipant &&
    new Date(activity?.scheduleDate).getTime() > new Date().getTime()
  ) {
    return <ActivityCountDownButton activity={activity} reset={reset} />;
  }

  const TWENTY_MINUTES = 20 * 60 * 1000;
  const now = new Date().getTime();
  if (activity.completedAt) {
    return <AtivityStatusButton acStatus="conclude" />;
  } else if (
    !isParticipant &&
    now > new Date(activity.scheduleDate).getTime() + TWENTY_MINUTES
  ) {
    return <AtivityStatusButton acStatus="inProgress" />;
  } else if (
    isParticipant &&
    now > new Date(activity?.scheduleDate).getTime() + TWENTY_MINUTES
  ) {
    return <AtivityStatusButton acStatus="inProgress" />;
  }
  if (
    isParticipant &&
    new Date(activity?.scheduleDate).getTime() > new Date().getTime()
  )
    return (
      <CancelParticipationButton
        onClickFunc={onClick.unsubscribeActivity}
        loading={loading}
      />
    );
  if (
    isParticipant &&
    new Date(activity?.scheduleDate).getTime() < new Date().getTime() &&
    !activity.completedAt &&
    !participants.find(par => par.userId === user?.id && par.confirmedAt)
  ) {
    return null
  }
  return (
    <ParticipationButton
      onClickFunc={onClick.subscribeActivity}
      activity={activityData}
      loading={loading}
    />
  );
};
