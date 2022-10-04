import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };



  return (
    
    <div className="authentication">
    <img className='logo' src='Logo.jpeg' />
      <div className="authentication-form card p-3">
  
 
        <h1 className="card-title">Prazer em Conhecer Voce</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Nome" name="name">
            <Input placeholder="Nome" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Senha" name="password">
            <Input placeholder="Senha" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            REGISTRAR
          </Button>

          <Link to="/login" className="anchor mt-2">
            Clique Aqui para Logar
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;