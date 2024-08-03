import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Card,
  Stack,
  Divider,
  Popover,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  FormControlLabel,
} from '@mui/material';
import Iconify from '@/shared/components/iconify';

type TodoListPropTypes = {
  title: string;
  subheader: string;
  list: [{ id: string; label: string }];
};

export default function TodoList({
  title,
  subheader,
  list,
  ...other
}: TodoListPropTypes) {
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2'],
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Controller
        name='taskCompleted'
        control={control}
        render={({ field }) => {
          const onSelected = (task: any) =>
            field.value.includes(task)
              ? field.value.filter((value) => value !== task)
              : [...field.value, task];

          return (
            <>
              {list.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={field.value.includes(task.id)}
                  onChange={() => field.onChange(onSelected(task.id))}
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
}

type TaskItemPropTypes = {
  checked: boolean;
  onChange: any;
  task: {
    id: string;
    label: string;
  };
};

function TaskItem({ task, checked, onChange }: TaskItemPropTypes) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
  };

  const handleShare = () => {
    handleCloseMenu();
  };

  const handleEdit = () => {
    handleCloseMenu();
  };

  const handleDelete = () => {
    handleCloseMenu();
  };

  return (
    <Stack
      direction='row'
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={task.label}
        sx={{ flexGrow: 1, m: 0 }}
      />

      <IconButton
        size='large'
        color='inherit'
        sx={{ opacity: 0.48 }}
        onClick={handleOpenMenu}
      >
        <Iconify icon={'eva:more-vertical-fill'} width={24} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ mr: 2 }} />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon={'eva:share-fill'} sx={{ mr: 2 }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Stack>
  );
}
