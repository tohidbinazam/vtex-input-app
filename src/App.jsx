import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';
import vtexInput from 'vtex-input';
import axios from 'axios';
import './App.css';

function App() {
  const [input, inputProps, form, setValue] = vtexInput({
    name: '',
    email: '',
    password: '',
    role: '',
    permissions: '',
    gender: '',
    photo: '',
    gallery: '',
  });

  const handlePassword = () => {
    const password = Math.random().toString(36).slice(-8);

    // You can set custom key value like this
    setValue({ password });

    toast.success('Password generated successfully');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    toast.success('Check console to see the data');

    // If you use any file input in your form, then you definitely use this form.data()
    axios.post('/api/v1/user', form.data()).then((res) => {
      console.log(res);
      toast.success('User created successfully');
      form.clear();
    });

    // If you don't use any file input in your form, then you can use [input / form.data() / form.input()] as you wish
    axios.post('/api/v1/user', input).then((res) => {
      console.log(res);
      toast.success('User created successfully');
      form.clear();
    });
  };

  const handelReset = () => {
    form.clear();
    toast.success('Form reset successfully');
  };

  return (
    <Card style={{ width: '28rem' }}>
      <Card.Header as='h4' className='text-center'>
        Add New User
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              {...inputProps('name', 'text')}
              placeholder='Give your full name'
            />
            <Form.Text className='text-muted'>
              we will never share your data with anyone else
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...inputProps('email', 'email')}
              placeholder='Give your email address'
            />
            <Form.Text className='text-muted'>
              we will never share your email with anyone else
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Password</Form.Label>
            <br />
            <Button variant='secondary' size='sm' onClick={handlePassword}>
              Make random password
            </Button>
            <br />
            <Form.Text className='text-muted'>
              This password will be sent to the user email
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Role</Form.Label>
            <Form.Select {...inputProps('role')}>
              <option>Select user role</option>
              <option value='super-admin'>Super Admin</option>
              <option value='admin'>Admin</option>
              <option value='editor'>Editor</option>
              <option value='analyst'>Analyst</option>
              <option value='author'>Author</option>
            </Form.Select>
            <Form.Text className='text-muted'>
              This Role set your permissions
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Permissions</Form.Label>
            {/* You can also use these checkboxes in the loop in the same way */}
            <Form.Check
              id='1'
              label='Product'
              {...inputProps('permissions', 'checkbox', 'product')}
              checked={input.permissions?.includes('product')}
            />
            <Form.Check
              id='2'
              label='Order'
              {...inputProps('permissions', 'checkbox', 'order')}
              checked={input.permissions?.includes('order')}
            />
            <Form.Check
              id='3'
              label='Store'
              {...inputProps('permissions', 'checkbox', 'store')}
              checked={input.permissions?.includes('store')}
            />
            <Form.Check
              id='4'
              label='Chart'
              {...inputProps('permissions', 'checkbox', 'chart')}
              checked={input.permissions?.includes('chart')}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Gender</Form.Label>
            <Form.Check
              id='11'
              label='Male'
              {...inputProps('gender', 'radio', 'male')}
              checked={input.gender?.includes('male')}
            />
            <Form.Check
              id='22'
              label='Female'
              {...inputProps('gender', 'radio', 'female')}
              checked={input.gender?.includes('female')}
            />
            <Form.Check
              id='33'
              label='Other'
              {...inputProps('gender', 'radio', 'other')}
              checked={input.gender?.includes('other')}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control {...inputProps('photo', 'file')} />
          </Form.Group>
          {input.photo && (
            <div className='mb-3'>
              <img src={input.photo.url} alt='photo' width={200} />
              <button onClick={() => form.delFile('photo')}>Delete</button>
            </div>
          )}

          <Form.Group className='mb-3'>
            <Form.Label>Gallery Photos</Form.Label>
            <Form.Control {...inputProps('gallery', 'file')} multiple />
          </Form.Group>
          {input.gallery &&
            input.gallery.map((data, index) => (
              <div className='mb-3' key={index}>
                <img src={data.url} alt='gallery' width={200} />
                <button onClick={() => form.delFile('gallery', index)}>
                  Delete
                </button>
              </div>
            ))}

          <Form.Group className='d-flex gap-2'>
            <Button
              onClick={handelReset}
              className='w-100'
              variant='danger'
              type='reset'
            >
              Clear
            </Button>
            <Button className='w-100' variant='primary' type='submit'>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer className='text-center'>
        <Alert variant='success'>
          <h6 className='fs-5'>
            Source code ={' '}
            <b>
              <Alert.Link
                target='_blank'
                href='https://github.com/tohidbinazam/vtex-input-app'
              >
                GitHub
              </Alert.Link>
            </b>
          </h6>
        </Alert>
      </Card.Footer>
    </Card>
  );
}

export default App;
