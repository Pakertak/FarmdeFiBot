PGDMP                         y            FarmBotDatabase    13.2    13.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    FarmBotDatabase    DATABASE     o   CREATE DATABASE "FarmBotDatabase" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Belarus.1251';
 !   DROP DATABASE "FarmBotDatabase";
                postgres    false            �            1259    16416    userreferral    TABLE     �   CREATE TABLE public.userreferral (
    telegramcode bigint NOT NULL,
    referraltelegramcode bigint NOT NULL,
    referralbalance numeric DEFAULT 0 NOT NULL
);
     DROP TABLE public.userreferral;
       public         heap    postgres    false            �            1259    16395    users    TABLE       CREATE TABLE public.users (
    telegramcode bigint NOT NULL,
    id bigint NOT NULL,
    twitter text,
    ethaddress text,
    airdroptaskscompleted boolean DEFAULT false NOT NULL,
    payrolldate date,
    balance numeric DEFAULT 0 NOT NULL,
    telegramusername text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �           0    0    COLUMN users.telegramcode    COMMENT     G   COMMENT ON COLUMN public.users.telegramcode IS 'user id in telegram
';
          public          postgres    false    200            �            1259    16398    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    200            �          0    16416    userreferral 
   TABLE DATA                 public          postgres    false    202   t       �          0    16395    users 
   TABLE DATA                 public          postgres    false    200   �       �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 24, true);
          public          postgres    false    201            -           2606    16412    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    200            .           1259    16427    referaltelegramcode_uniq    INDEX     h   CREATE UNIQUE INDEX referaltelegramcode_uniq ON public.userreferral USING btree (referraltelegramcode);
 ,   DROP INDEX public.referaltelegramcode_uniq;
       public            postgres    false    202            +           1259    16410    telegramcode_uniq    INDEX     ^   CREATE UNIQUE INDEX telegramcode_uniq ON public.users USING btree (telegramcode NULLS FIRST);
 %   DROP INDEX public.telegramcode_uniq;
       public            postgres    false    200            /           2606    16428    userreferral telegramcode_FK 
   FK CONSTRAINT     �   ALTER TABLE ONLY public.userreferral
    ADD CONSTRAINT "telegramcode_FK" FOREIGN KEY (telegramcode) REFERENCES public.users(telegramcode) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 H   ALTER TABLE ONLY public.userreferral DROP CONSTRAINT "telegramcode_FK";
       public          postgres    false    2859    202    200            �   
   x���          �   �   x�5N�j�0��w��_CW�R�:B���i��Ai��R�9�U5]��P5��cT��t�N�k�L�D�$`�fkQ@�!��h1k���
�i�m�Zt�]<���օG��:9���;���pʶ���y����W��V�a���a��4"�B� �v9�4�S�I�;�0e<�#��K�q1ޓ;
�"�9h��)�8�Շ����@D���b<�~�<���RG     